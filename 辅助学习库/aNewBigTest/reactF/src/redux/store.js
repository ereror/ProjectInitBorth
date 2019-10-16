import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk';
import counter from 'reducers/counter'
import userInfo  from 'reducers/userInfo';

// let store = createStore(counter)
let store = createStore(combineReducers({counter, userInfo}), applyMiddleware(thunkMiddleware))
export default store

// store
// getState() 获取state
// dispatch(action) 触发reducers方法更新state
// subscibe(listener) 注册监听器
// 