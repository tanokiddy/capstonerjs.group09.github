import { localServ } from "../services/localService";
import {
  EDIT_USER,
  GET_LIST_USER,
  GET_USER_PROFILE,
  GET_USER_TICKET,
  SET_USER,
  UPDATE_USER,
  UPDATE_USER_PROFILE,
  USER_DELETE,
} from "./constants/constants";

export const initialState = {
  userInfo: localServ.user.getDataUser(),
  userListAdmin: [],
  userAdmin: {},

  userProfile: {},
  userTicket: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    //ADMIN
    case GET_LIST_USER: {
      return { ...state, userListAdmin: action.listUser };
    }
    case EDIT_USER: {
      state.userAdmin = action.user;
      return { ...state };
    }
    case UPDATE_USER: {
      let cloneUserListAdmin = state.userListAdmin;
      let index = cloneUserListAdmin.findIndex((item) => {
        return item.taiKhoan === action.user.taiKhoan;
      });
      cloneUserListAdmin[index] = action.user;
      state.userListAdmin = cloneUserListAdmin;
      return { ...state };
    }
    case USER_DELETE: {
      let cloneUserListAdmin = state.userListAdmin;
      let index = cloneUserListAdmin.findIndex((item) => {
        return item.taiKhoan === action.taiKhoan;
      });
      cloneUserListAdmin.splice(index, 1);
      state.userListAdmin = cloneUserListAdmin;
      return { ...state };
    }
    //USER
    case SET_USER: {
      return { ...state, userInfo: action.userData };
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
