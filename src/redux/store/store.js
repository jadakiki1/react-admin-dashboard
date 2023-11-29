/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers/reducers';
import thunk from 'redux-thunk';

// Configure persistor
const persistConfig = {
  key: 'jad-user',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['modalReducer']
};

export const configureStore = () => {
  const pReducer = persistReducer(persistConfig, reducers);
  return createStore(pReducer,
                      applyMiddleware(thunk),
                      composeWithDevTools());
};

export const configurePersistor = store => persistStore(store);