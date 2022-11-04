import Swal from "sweetalert2";
import { userServ } from "../../services/userService";
import {
  EDIT_USER,
  GET_LIST_USER,
  SET_USER,
  UPDATE_USER,
  USER_DELETE,
} from "../constants/constants";
import { loadingOffAction, loadingOnAction } from "./loadingAction";

//ADMIN
//GET USERLIST
export const callUserList = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingOnAction());
      let res = await userServ.userList();
      if (res.status === 200) {
        dispatch(loadingOffAction());
        dispatch({
          type: GET_LIST_USER,
          listUser: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//DELETE USER
export const userDeleteAdmin = (taiKhoan) => {
  return async (dispatch) => {
    try {
      dispatch(loadingOnAction());
      let res = await userServ.userDelete(taiKhoan);
      if (res.status === 200) {
        dispatch(loadingOffAction());
        dispatch({
          type: USER_DELETE,
          taiKhoan,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.content,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
//UPDATE USER
export const userUpdate = (values) => {
  return async (dispatch) => {
    try {
      let res = await userServ.userEditinginAdmin(values);
      if (res.status === 200) {
        dispatch({
          type: UPDATE_USER,
          user: values,
        });
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.content,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};

//-Action
export const userEditingAction = (user) => {
  return {
    type: EDIT_USER,
    user,
  };
};

export const userUpdateAction = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

//USER HOME
export const userLoginAction = (userData) => {
  return {
    type: SET_USER,
    userData,
  };
};
