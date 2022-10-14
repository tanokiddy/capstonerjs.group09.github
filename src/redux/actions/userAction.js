import { SET_USER } from "../constants/constants";

export const userLoginAction = (userData) => {
  return {
    type: SET_USER,
    userData,
  };
};
