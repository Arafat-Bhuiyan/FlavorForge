import { toast } from "react-toastify";
import * as jwt_decode from "jwt-decode";

// Check if the access token is expired
export const isAccessTokenExpired = (access_token) => {
  try {
    const decodedToken = jwt_decode(access_token);
    return decodedToken.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};
