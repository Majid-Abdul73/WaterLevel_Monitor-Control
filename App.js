global.setTimeout = global.setTimeout || require('timers').setTimeout;
global.clearTimeout = global.clearTimeout || require('timers').clearTimeout;
global.setImmediate = global.setImmediate || require('timers').setImmediate;
global.fetch = global.fetch || require('node-fetch');
global.Headers = global.Headers || require('node-fetch').Headers;
global.Request = global.Request || require('node-fetch').Request;
global.Response = global.Response || require('node-fetch').Response;
global.FileReader = global.FileReader || require('filereader');
global.Blob = global.Blob || require('blob-polyfill').Blob;
global.FormData = global.FormData || require('form-data');
global.URLSearchParams = global.URLSearchParams || require('url').URLSearchParams;
global.AbortController = global.AbortController || require('abortcontroller-polyfill');
global.XMLHttpRequest = global.XMLHttpRequest || require('xmlhttprequest').XMLHttpRequest;
global.performance = global.performance || require('perf_hooks').performance;
global.navigator = global.navigator || { scheduling: { isInputPending: () => false } };





import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { WaterLevelProvider } from './context/WaterLevelContext';

const App = () => {
  return (
    <WaterLevelProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </WaterLevelProvider>
  );
};

export default App;
