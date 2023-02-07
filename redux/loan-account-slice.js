import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    CREATE_ENROLLMENT,
    ADD_BILLING_ACCOUNT,
    SEARCH_FUNDING,
    DELETE_FUNDING,
    SEARCH_PAYMENT_BY_BILLING_ACCOUNT,
    GET_PAYMENT_INFO
} from "../app/http-common";
import { APIServices } from "/services/Common"

const initialState = {
    loading: false,
    error: false,
    errorMessage: "", 
    paymentCards:[],
    cardDeleteError: false,
    cardErrorMsg:"",
    userPaymentLoading:false,
    getUserPaymentInfoDataLoading:false,
    getUserPaymentInfoData:[],
    userPaymentError: false,
    userPaymentErrorMessage: "",
    userPaymentData:[],
    isDeleteFundingData : false
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

export const createEnrollment = createAsyncThunk(
    "loanAccount/createEnrollment",
    async (data,{ getState }) => {
        const { config } = getState().config;
        if (!Object.keys(config).length) return;
        const response = APIServices.postData(config.apiBaseUrl + CREATE_ENROLLMENT, data)
            .then((data) => {
                if (data.status === "error") {
                    handleResponse(data);
                    throw new Error(data.message);
                }
                return data.data
            }).catch((error) => {
                if (error.request.status === 404) {
                    throw new Error("Request Not Found|404");
                } else if (error.request.status === 400) {
                    throw new Error((error?.response?.data?.code).toString())
                }
                else if (error.request.status === 500) {
                    throw new Error("The server was unable to complete your request");
                } else if (error.request.status === 0) {
                    throw new Error("Internal Server Error|0");
                } else {
                    throw new Error(
                        error.response.data.message.en +
                        "|" +
                        error.response.data.message.es +
                        "|" +
                        error.response.data.code
                    );
                }
            })
        return response;
    }
);


export const deletePaymentCard = createAsyncThunk(
    "loanAccount/deletePaymentCard",
    async(data,{ getState }, dispatch) => {
        const { config } = getState().config;
        if (!Object.keys(config).length) return;

        const response = await fetch(config.apiBaseUrl + DELETE_FUNDING, {
            method: "POST",
            body: JSON.stringify(data),
            headers: getHeaders(),
        }).then((response) => response.json())
        .then((data) => {
            if (data.status === "error" || data.code === 25746 || data.status === "Internal Server Error") {
                handleResponse(data);
                throw new Error(data.message);
            }
            // else if (data.status = "success") {
            //     dispatch(searchFunding(data))
            // }
            return data;
        });
        return response;
    }
);

export const searchFunding = createAsyncThunk("loanAccount/searchFunding", 
async (data,{ getState }) => {
    const { config } = getState().config;
    if (!Object.keys(config).length) return;

    const response = await fetch(config.apiBaseUrl + SEARCH_FUNDING, {
        method: "POST",
        body: JSON.stringify(data),
        headers: getHeaders(),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "error" || data.status === "Internal Server Error") {
                handleResponse(data);
                throw new Error(data.message);
            }
            return data;
        });
    return response;
}
)
export const addBillingAccount = createAsyncThunk("loanAccount/addBillingAccount", 
    async (data,{ getState }) => {
        const { config } = getState().config;
        if (!Object.keys(config).length) return;

        const response = await fetch(config.apiBaseUrl + ADD_BILLING_ACCOUNT, {
            method: "POST",
            body: JSON.stringify(data),
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
)
export const getUserPaymentDetails = createAsyncThunk(
  "searchPayment/getUserPaymentDetails",
  async (data,{ getState }) => {
    const { config } = getState().config;
    if (!Object.keys(config).length) return;

    const response = await fetch(config.apiBaseUrl + SEARCH_PAYMENT_BY_BILLING_ACCOUNT, {
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

export const getUserPaymentInfo = createAsyncThunk(
    "loanAccount/getUserPaymentInfo",
    async (data,{ getState }) => {
      const { config } = getState().config;
      if (!Object.keys(config).length) return;
  
        const response = await fetch(config.apiBaseUrl + GET_PAYMENT_INFO, {
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

const loanAccountSlice = createSlice({
    name: 'loanAccount',
    initialState,
    reducers: {
        userInfo: (state, action) => {
            // const {accountNo, ssnNo} = action.payload;
            // state.accountNumber = accountNo;
            // state.ssnNumber = ssnNo;
        },
        clearDeletePaymentError : (state) => {
            state.cardErrorMsg = "";
            state.cardDeleteError = false;
        },
        addError(state, action) {
            state.errorMessage = action.payload;
        },
        resetPaymentData(state, action) {
            state.getUserPaymentInfoData = []
        },
        falsecreateEnrollmentError(state, action) {
            state.createEnrollmentError = action.payload
        },
        setDeleteFundingData(state, action){
            state.isDeleteFundingData = false
        }
    },
    extraReducers: {
        [createEnrollment.pending]: (state) => {
            state.createEnrollmentLoading = true;
        },
        [createEnrollment.fulfilled]: (state, { payload }) => {          
            state.createEnrollmentLoading = false;
            state.createEnrollmentData = payload;
        },
        [createEnrollment.rejected]: (state, action) => {
            state.createEnrollmentLoading = false;
            state.createEnrollmentError = true;
            const error = action.error.message;
            state.errorMessage = error;
        },
        [addBillingAccount.pending]: (state) => {
            state.addBillingAccountLoading = true;
        },
        [addBillingAccount.fulfilled]: (state, { payload }) => {
            state.addBillingAccountLoading = false;
            state.addBillingAccountData = payload;
        },
        [addBillingAccount.rejected]: (state, { payload }) => {
            state.addBillingAccountLoading = false;
            state.addBillingAccountError = true;
        },
        [searchFunding.pending]: (state) => {
            state.searchFundingLoading = true;
        },
        [searchFunding.fulfilled]: (state, { payload }) => {
            state.searchFundingLoading = false;
            state.searchFundingData = payload;
            state.paymentCards = payload
        },
        [searchFunding.rejected]: (state, { payload }) => {
            state.searchFundingLoading = false;
            state.searchFundingError = true;
        },
        [deletePaymentCard.pending]: (state) => {
            state.deleteFundingLoading = true;
            state.cardDeleteError = false;
            state.cardErrorMsg = "";
        },
        [deletePaymentCard.fulfilled]: (state, action) => {
            state.cardDeleteError = false;
            state.cardErrorMsg = "";
            const tokenId = action.payload;
            state.deleteFundingLoading = false;
            state.isDeleteFundingData = true
            if(Array.isArray(state.searchFundingData?.data?.tokens))  {
                state.searchFundingData = state.searchFundingData?.data?.tokens.filter((item) => item?.["token-id"] !== tokenId) 
            }   
            else{
                let cardId = state.searchFundingData?.data?.tokens["token-id"].includes(tokenId);
                if (cardId === true) {
                    state.searchFundingData = []
                }
                else {
                    state.searchFundingData = state.searchFundingData
                }
            }       
        },
        [deletePaymentCard.rejected]: (state, action) => {
            state.deleteFundingLoading = false;
            state.searchFundingError = true;
            state.cardErrorMsg = action.error.message;
            state.cardDeleteError = true;
        },
        [getUserPaymentDetails.pending]: (state) => {
            state.userPaymentLoading = true;
          },
        [getUserPaymentDetails.fulfilled]: (state, action) => {
            state.userPaymentLoading = false;
            state.userPaymentData = action.payload;
        },
        [getUserPaymentDetails.rejected]: (state, action) => {
            state.userPaymentLoading = false;
        },
        [getUserPaymentInfo.pending]: (state) => {
            state.getUserPaymentInfoDataLoading = true;
          },
        [getUserPaymentInfo.fulfilled]: (state, action) => {
            state.getUserPaymentInfoDataLoading = false;
            state.getUserPaymentInfoData = action.payload;
        },
        [getUserPaymentInfo.rejected]: (state, action) => {
            state.getUserPaymentInfoDataLoading = false;
        }
    },

});

export const { userInfo, clearDeletePaymentError ,setDeleteFundingData, addError, resetPaymentData, falsecreateEnrollmentError} = loanAccountSlice.actions;
export default loanAccountSlice.reducer;