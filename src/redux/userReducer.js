import { localServ } from "../services/localService";
import {
  ADD_USER,
  EDIT_USER,
  GET_LIST_USER,
  GET_USER_PROFILE,
  GET_USER_TICKET,
  SEARCH_USER,
  UPDATE_USER,
  UPDATE_USER_PROFILE,
  USER_DELETE,
  USER_LOGIN,
  USER_REGISTER,
} from "./constants/constants";

export const initialState = {
  userAdmin: {},
  userSearching: [],

  userInfo: localServ.user.getDataUser(),
  userProfile: {},
  userTicket: [],
  userList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    //ADMIN
    case ADD_USER: {
      state.userList.push(action.userAdding);
      return { ...state };
    }
    case SEARCH_USER: {
      return { ...state, userSearching: action.userSearching };
    }
    case GET_LIST_USER: {
      return { ...state, userList: action.userList };
    }
    case EDIT_USER: {
      state.userAdmin = action.user;
      return { ...state };
    }
    case UPDATE_USER: {
      let cloneUserList = [...state.userList];
      let index1 = cloneUserList.findIndex((item) => {
        return item.taiKhoan === action.user.taiKhoan;
      });
      cloneUserList[index1] = action.user;

      let cloneUserSearching = [...state.userSearching];
      let index2 = cloneUserSearching.findIndex((item) => {
        return item.taiKhoan === action.user.taiKhoan;
      });
      cloneUserSearching[index2] = action.user;

      state.userSearching = cloneUserSearching;
      state.userList = cloneUserList;
      state.userAdmin = action.user;
      return { ...state };
    }
    case USER_DELETE: {
      let cloneUserList = state.userList.filter((item) => {
        return item.taiKhoan !== action.taiKhoan;
      });

      let cloneUserSearching = state.userSearching.filter((item) => {
        return item.taiKhoan !== action.taiKhoan;
      });

      state.userList = cloneUserList;
      state.userSearching = cloneUserSearching;
      return { ...state };
    }
    //USER
    case USER_LOGIN: {
      return { ...state, userInfo: action.user };
    }
    case USER_REGISTER: {
      state.userList.push(action.userRegister);
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
