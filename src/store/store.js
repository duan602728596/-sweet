/**
 * 全局的store
 */
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { fromJS, Map } from 'immutable';
import { createReducer, createSagas } from './reducers';

/* reducer列表 */
const reducer = createReducer({});

/* 中间件 */
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

/* store */
const store = {
  asyncReducers: {}
};

export function storeFactory(initialState = {}) {
  /* initialState */
  const state = fromJS(initialState);
  const $$initialState = Map(state);

  /* store */
  Object.assign(store, createStore(reducer, $$initialState, compose(middleware)));

  createSagas(sagaMiddleware);

  return store;
}

export default store;

/* 注入store */
export function injectReducers(asyncReducer) {
  for (const key in asyncReducer) {
    const item = asyncReducer[key];

    // 获取reducer的key值，并将reducer保存起来
    if (!(key in store.asyncReducers)) {
      store.asyncReducers[key] = item;
    }
  }

  // 异步注入reducer
  store.replaceReducer(createReducer(store.asyncReducers));
}

export function injectSagas(sagas) {
  sagaMiddleware.run(function *() {
    for (const key in sagas) {
      yield fork(sagas[key]);
    }
  });
}