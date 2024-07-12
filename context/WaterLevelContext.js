import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const WaterLevelContext = createContext();

export const useWaterLevel = () => {
  return useContext(WaterLevelContext);
};

export const WaterLevelProvider = ({ children }) => {
  const [waterLevel, setWaterLevel] = useState(0.0);
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [isManualOn, setIsManualOn] = useState(false); // State for manual control

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data: waterData, error: waterError } = await supabase
          .from('water_level')
          .select('water_level, pump_status, manual_status')
          .order('created_at', { ascending: false })
          .limit(1);

        if (waterError) throw waterError;

        if (waterData && waterData.length > 0) {
          setWaterLevel(waterData[0].water_level / 100);
          setIsPumpOn(waterData[0].pump_status);
          setIsManualOn(waterData[0].manual_status); // Update manual status
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();

    const waterLevelSubscription = supabase
      .channel('public:water_level')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'water_level' }, payload => {
        setWaterLevel(payload.new.water_level / 100);
        setIsPumpOn(payload.new.pump_status);
        setIsManualOn(payload.new.manual_status); // Update manual status
      })
      .subscribe();

    return () => {
      supabase.removeChannel(waterLevelSubscription);
    };
  }, []);

  const updateManualStatus = async (status) => {
    try {
      const { error } = await supabase
        .from('water_level')
        .update({ manual_status: status })
        .eq('id', 1); // Adjust based on your table's structure

      if (error) {
        console.error('Error updating manual status:', error);
      } else {
        setIsManualOn(status); // Update local state after successful update
      }
    } catch (error) {
      console.error('Unexpected error updating manual status:', error);
    }
  };

  return (
    <WaterLevelContext.Provider value={{ waterLevel, isPumpOn, setIsPumpOn, isManualOn, updateManualStatus }}>
      {children}
    </WaterLevelContext.Provider>
  );
};
