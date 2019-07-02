import { combineReducers } from 'redux';

import account from './account';
import shop from './shop';

export default combineReducers({
  account,
  shop
});
