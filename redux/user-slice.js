import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GETCUSTOMER_SESSION,
  POSTCUSTOMER_SESSION,
} from "../app/http-common";

const initialState = {
    isLoggedInState : false,
    uuid: "",
    loading: false,
    error: false,
    postCustomerSessionLoading: false,
    postCustomerSessionData: [],
    postCustomerSessionError: false,
    errorMessage: "",
    profileId: ''
};

function handleResponse(response) {
  return (dispatch, getState) => {
    switch (response.errorCode) {
      case 400:
        dispatch(addError(response.message));
      case 500:
        break;
      default:
        break;
    }
  };
}

const getHeaders = () => {
  return {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json",
    'Access-Control-Allow-Origin': 'no-cors'
  }
}


export const getCustomer = createAsyncThunk(
  "user/getCustomer",
  async (uuid,{ getState }) => {
    const { config } = getState().config;
    if (!Object.keys(config).length) return;

    const response = await fetch(config.apiBaseUrl + GETCUSTOMER_SESSION, {
      method: "POST",
      body: JSON.stringify({ uuid: uuid }),
      headers: getHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          handleResponse(data);
          throw new Error(data.message);
        }
        return data;
      });

    return response;
  }
);

export const postCustomerSession = createAsyncThunk(
  "user/postCustomerSession",
  async (data,{ getState }) => {
    const { config } = getState().config;
    if (!Object.keys(config).length) return;

    const response = await fetch(config.apiBaseUrl + POSTCUSTOMER_SESSION, {
      method: "POST",
      body: JSON.stringify(data),
      headers: getHeaders(),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "error") {
          throw new Error(data.message);
        }
        return data;
      });
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserState: {
      reducer(state, action) {
        state[action.payload.key] = action.payload.val;
      },
      prepare(key, val) {
        return {
          payload: {
            key,
            val
          }
        }
      }
    },
    setUUID(state, action) {
      state.uuid = action.payload;
    },
    setProfileId(state, action){
      state.profileId = action.payload
    },
    addError(state, action) {
      state.errorMessage = action.payload;
    }  },
  extraReducers: {
    [getCustomer.pending]: (state) => {
      state.loading = true;
    },
    [getCustomer.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.profileId = payload?.data?.profileId
    },
    [getCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
    },
    [postCustomerSession.pending]: (state) => {
      state.postCustomerSessionLoading = true;
    },
    [postCustomerSession.fulfilled]: (state, { payload }) => {
      state.postCustomerSessionLoading = false;
      state.postCustomerSessionData = payload;
    },
    [postCustomerSession.rejected]: (state, { payload }) => {
      state.postCustomerSessionLoading = false;
      state.postCustomerSessionError = true;
    }
  },
  
});

export const { updateUserState, setUUID, setProfileId, addError } = userSlice.actions;
export default userSlice.reducer;