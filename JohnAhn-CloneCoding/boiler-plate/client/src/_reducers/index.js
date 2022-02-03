import { combineReducers} from 'redux' 
import user from './user_reducer.js';   // user 에 관한 reducer

// Store 안에 여러개의 reducer 존재 (state 따라서 redux 다름)
// 그래서 combineReducer를 통해 root reducer 하나로 합쳐줌
const rootReducer = combineReducers({
    user
})

export default rootReducer;