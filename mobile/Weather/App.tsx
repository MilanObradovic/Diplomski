import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {View} from 'react-native';
import Navigation from './src/navigation';
import AppThemeProvider from './src/context/theme';
import {ThemedStatusBar} from './src/components/statusBar';
import {Provider as ReduxProvider} from 'react-redux';
import rootReducer from './src/redux/reducers';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const composeEnhancers =
//   global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['settings', 'bookmark'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppThemeProvider>
            <ThemedStatusBar />
            <Navigation />
          </AppThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </View>
  );
};

export default App;
