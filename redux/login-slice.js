import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RETRIEVE_MAM_DETAIL } from "app/http-common";
import { APIServices } from "/services/Common"
import { RETRIEVE_ENROLLNMENT_PROFILE_DETAILS } from "app/http-common"

const initialState = {
    isLoggedIn: false,
    userBillingDetails: [],
    accountNumber: "",
    ssnNumber: "",
    userLoading: false,
    loginError: false,
    errorMessage: "",
    errorMessageEN: '',
    errorMessageES: '',
    errorCode:'',
    retriveEnrollmentProfileDetailsData: {}
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
export const getUserBillingDetails = createAsyncThunk(
    "loginDetails/getUserBillingDetails",
    async (data, { getState }) => {
        const { config } = getState().config;
        if (!Object.keys(config).length) return;

        const response = APIServices.postData(config.apiBaseUrl + RETRIEVE_MAM_DETAIL, data)
            .then((data) => {

                if (data.status === "error") {
                    handleResponse(data);
                    throw new Error(data.message);
                }
                return data.data
            }).catch((error) => {
                if (
                  error.response.data === undefined ||
                  error.response.data.message === undefined
                ) {
                  if (error.request.status === 404) {
                    throw new Error("Request Not Found|404");
                  } else if (error.request.status === 500) {
                    throw new Error("Internal Server Error|500");
                  } else if (error.request.status === 0) {
                    throw new Error("Internal Server Error|0");
                  }
                } else {
                  throw new Error(
                    error.response.data.message.en +
                      "|" +
                      error.response.data.message.es +
                      "|" + 
                      error.response.data.code
                  );
                }
              }
            );
        return response;
    }
)

export const retriveEnrollmentProfileDetails = createAsyncThunk(
    "loginDetails/retriveEnrollmentProfileDetails",
    async (data, { getState }) => {
        const { config } = getState().config;
        if (!Object.keys(config).length) return;
        const response = APIServices.postData(config.apiBaseUrl + RETRIEVE_ENROLLNMENT_PROFILE_DETAILS, data).then((data) => {
            if (data.status === "error") {
                handleResponse(data);
                throw new Error(data.message);
            }
            return data.data
        })
        return response
    }
)

const loginSlice = createSlice({
    name: 'loginDetails',
    initialState,
    reducers: {
        userInfo: (state, action) => {
            const { accountNo, ssnNo } = action.payload;
            state.accountNumber = accountNo;
            state.ssnNumber = ssnNo;
        },
        setAccountNumber: (state, action) => {
            state.accountNumber = action.payload
        },
        addError(state, action) {
            state.errorMessage = action.payload;
        },
        setLoginError(state, action) {
            state.loginError = action.payload;
        },
        setuserBillingDetailsBlank(state, action) {
            state.userBillingDetails = [];
        }
    },
    extraReducers: {
        [getUserBillingDetails.pending]: (state) => {
            state.userLoading = true;
        },
        [getUserBillingDetails.fulfilled]: (state, { payload }) => {
            state.userLoading = false;
            state.userBillingDetails = payload;
        },
        [getUserBillingDetails.rejected]: (state, action) => {
            state.userLoading = false;
            state.loginError = true;
            const error = action.error.message.split("|");;
            state.errorMessageEN = error[0];
            state.errorMessageES = error[1];
            state.errorCode = error[2];
        },
        [retriveEnrollmentProfileDetails.pending]: (state) => {
            state.userLoading = true;
        },
        [retriveEnrollmentProfileDetails.fulfilled]: (state, { payload }) => {
            state.userLoading = false;
            state.retriveEnrollmentProfileDetailsData = payload;
        },
        [retriveEnrollmentProfileDetails.rejected]: (state, action) => {

            state.userLoading = false;
            state.loginError = true;
            state.errorMessage = action.error.message;
        },
    }
});

export const { userInfo, setAccountNumber, addError, setLoginError,setuserBillingDetailsBlank } = loginSlice.actions;
export default loginSlice.reducer