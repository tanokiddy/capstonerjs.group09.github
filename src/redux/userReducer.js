import { localServ } from "../services/localService";
import {
  EDIT_USER,
  GET_LIST_USER,
  GET_USER_PROFILE,
  GET_USER_TICKET,
  UPDATE_USER,
  UPDATE_USER_PROFILE,
  USER_DELETE,
  USER_LOGIN,
  USER_REGISTER,
} from "./constants/constants";

export const initialState = {
  userAdmin: {},

  userInfo: localServ.user.getDataUser(),
  userProfile: {},
  userTicket: [],
  userList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    //ADMIN
    case GET_LIST_USER: {
      return { ...state, userList: action.userList };
    }
    case EDIT_USER: {
      state.userAdmin = action.user;
      return { ...state };
    }
    case UPDATE_USER: {
      let cloneUserList = state.userList;
      let index = cloneUserList.findIndex((item) => {
        return item.taiKhoan === action.user.taiKhoan;
      });
      cloneUserList[index] = action.user;
      state.userList = cloneUserList;
      return { ...state };
    }
    case USER_DELETE: {
      let cloneUserList = state.userList.filter((item) => {
        return item.taiKhoan !== action.taiKhoan;
      });
      state.userList = cloneUserList;
      return { ...state };
    }
    //USER
    case USER_LOGIN: {
      return { ...state, userInfo: action.user };
    }
    case USER_REGISTER: {
      console.log(action.userRegister);
      // state.userList.push(action.userRegister);
      return { ...state };
    }
    case GET_USER_PROFILE: {
      return { ...state, userProfile: action.userProfile };
    }
    case UPDATE_USER_PROFILE: {
      return { ...state, userProfile: action.userProfile };
    }
    case GET_USER_TICKET: {
      return { ...state, userTicket: action.userTicket };
    }
    default:
      return { ...state };
  }
};
