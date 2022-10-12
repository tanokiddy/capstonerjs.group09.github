import { localServ } from "../services/localService";
import { SET_USER } from "./constants/constants";

export const initialState = {
  userInfo: localServ.user.getDataUser(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, userInfo: action.payload };
    }
    default:
      return { ...state };
  }
};
