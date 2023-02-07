import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    uuidcookie: false
};
const checkUuidCookiesSlice = createSlice({
    name: "setCookieOnServer",
    initialState,
    reducers: {
        cookiesInfo: (state, action) => {
            state.uuidcookie = action.payload;
        }
    }
});
export const { cookiesInfo } = checkUuidCookiesSlice.actions;
export default checkUuidCookiesSlice.reducer;
