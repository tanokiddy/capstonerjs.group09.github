import Swal from "sweetalert2";
import { localServ } from "../../services/localService";
import { userServ } from "../../services/userService";
import {
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
  ADD_USER,
} from "../constants/constants";

//ADMIN
//-ADD USER
export const userAddingAction = (values) => {
  return async (dispatch) => {
    try {
      let res = await userServ.addUser(values);
      if (res.status === 200) {
        await dispatch({
          type: ADD_USER,
          userAdding: values,
        });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Adding User Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/admin/userManagement";
      }
    } catch (err) {
      console.log(err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.content,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
//-SEARCH USER
export const userSearchAction = (id) => {
  return async (dispatch) => {
    try {
      let res = await userServ.userSearch(id);
      if (res.status === 200) {
        await dispatch({
          type: SEARCH_USER,
          userSearching: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//-GET USERLIST
export const callUserList = () => {
  return async (dispatch) => {
    try {
      let res = await userServ.userList();
      if (res.status === 200) {
        await dispatch({
          type: GET_LIST_USER,
          userList: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//-DELETE USER
export const userDeleteAdmin = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let res = await userServ.userDelete(taiKhoan);
      if (res.status === 200) {
        await dispatch({
          type: USER_DELETE,
          taiKhoan,
        });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.content,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
//-UPDATE USER
export const userUpdate = (values) => {
  return async (dispatch) => {
    try {
      let res = await userServ.userEditinginAdmin(values);
      if (res.status === 200) {
        await dispatch({
          type: UPDATE_USER,
          user: values,
        });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Update successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      await Swal.fire({
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

//USER
//USER PROFILE HOMEPAGE
export const getUserProfileAction = (form) => {
  return async (dispatch) => {
    try {
      let res = await userServ.getUserProfile();
      if (res.status === 200) {
        await dispatch({
          type: GET_USER_PROFILE,
          userProfile: res.data.content,
        });
        form.setFieldsValue({
          matKhau: res.data.content.matKhau,
          email: res.data.content.email,
          soDT: res.data.content.soDT,
          hoTen: res.data.content.hoTen,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateUserProfileAction = (values) => {
  return async (dispatch) => {
    try {
      let res = await userServ.updateUserProfile(values);
      if (res.status === 200) {
        await dispatch({
          type: UPDATE_USER_PROFILE,
          userProfile: values,
        });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Update Profile Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.content,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
//USER PROFILE TICKET HOMEPAGE
export const userTicketAction = () => {
  return async (dispatch) => {
    try {
      let res = await userServ.userTicket();
      if (res.status === 200) {
        await dispatch({
          type: GET_USER_TICKET,
          userTicket: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//USER LOGIN HOMEPAGE
export const userLoginAction = (values) => {
  return async (dispatch) => {
    try {
      let res = await userServ.userLogin(values);
      if (res.status === 200) {
        await localServ.user.setDataUser(res.data.content);
        await dispatch({
          type: USER_LOGIN,
          user: res.data.content,
        });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.content,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
//USER REGISTER HOMEPAGE
export const userRegisterAction = (values) => {
  return async (dispatch) => {
    try {
      let res = await userServ.userRegister(values);
      if (res.status === 200) {
        await dispatch({
          type: USER_REGISTER,
          userRegister: values,
        });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Register Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.content,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
