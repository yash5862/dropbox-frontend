import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const option = {
  autoClose: 1000
}

const defaultHeaders = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
  "ngrok-skip-browser-warning":"any"
};

export const defaultAxios = axios.create({});

export function apiClient({
  url,
  data = {},
  method = "POST",
  headers = {},
  noHeaders,
  isAuth = true,
  isToast,
  ...rest
}) {
  return new Promise((resolve, reject) => {
    defaultAxios({
      method,
      url,
      headers: {
        ...(noHeaders ? {} : defaultHeaders),
        ...headers,
        ...(isAuth ? { Authorization: 'Bearer ' + localStorage.getItem('token') } : {})
      },
      data,
      ...rest,
    })
      .then((res) => {
        resolve(res.data);
        if(isToast) toast.success(res?.data?.message,option)
      })
      .catch((err) => {
        if (err.response) {
          reject(err.response);
          if (err.response.data.statusCode === 401) {
            localStorage.removeItem("token");
          } else {
            toast.error(err.response.data.message,option);
          }
        } else {
          reject(err);
        }
      });
  });
}
