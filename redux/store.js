import { configureStore } from '@reduxjs/toolkit';

import userSlice from './user-slice';
import loginSlice from './login-slice';
import loanAccountSlice from './loan-account-slice';
import checkUuidCookiesSlice from './get-uuid-cookies';
import configSlice from './config-slice';

export const store = configureStore({
  reducer: {
    user:  userSlice,
    userDetail: loginSlice,
    loanAccount: loanAccountSlice,
    cookie:checkUuidCookiesSlice,
    config: configSlice,
  }
});
