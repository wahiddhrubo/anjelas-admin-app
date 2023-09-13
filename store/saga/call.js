import axios from "axios";
export const axiosCall = async ({ url, method, data }) => {
  return await axios({
    url,
    method,
    data,
  });
};
export const axiosCredentialsCall = async ({ url, method, data }) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  return await axios({
    url,
    method,
    data,
    config,
    withCredentials: true,
  });
};
