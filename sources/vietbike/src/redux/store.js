import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';
import MQTTReduxMiddleware from "./middleware/mqttMiddleware";

const initialState = {};

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware, MQTTReduxMiddleware);

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middleware)
  );

  sagaMiddleware.run(rootSaga);

  // httpServiceManager.setReduxStore(store);
  return {
    store
  };
};
