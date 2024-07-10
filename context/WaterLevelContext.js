import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const WaterLevelContext = createContext();

export const useWaterLevel = () => {
  return useContext(WaterLevelContext);
};

export const WaterLevelProvider = ({ children }) => {
  const [waterLevel, setWaterLevel] = useState(0.0);
  const [isPumpOn, setIsPumpOn] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data: waterData, error: waterError } = await supabase
          .from('water_level')
          .select('water_level')
          .order('created_at', { ascending: false })
          .limit(1);

        if (waterError) throw waterError;

        if (waterData && waterData.length > 0) {
          setWaterLevel(waterData[0].water_level / 100);
        }

        const { data: pumpData, error: pumpError } = await supabase
          .from('pump_status')
          .select('is_on')
          .order('created_at', { ascending: false })
          .limit(1);

        if (pumpError) throw pumpError;

        if (pumpData && pumpData.length > 0) {
          setIsPumpOn(pumpData[0].is_on);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();

    const pumpSubscription = supabase
      .channel('public:pump_status')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pump_status' }, payload => {
        setIsPumpOn(payload.new.is_on);
      })
      .subscribe();

    const waterLevelSubscription = supabase
      .channel('public:water_levels')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'water_level' }, payload => {
        setWaterLevel(payload.new.water_level / 100);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(pumpSubscription);
      supabase.removeChannel(waterLevelSubscription);
    };
  }, []);

  return (
    <WaterLevelContext.Provider value={{ waterLevel, isPumpOn, setIsPumpOn }}>
      {children}
    </WaterLevelContext.Provider>
  );
};
