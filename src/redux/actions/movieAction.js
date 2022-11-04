import Swal from "sweetalert2";
import { movieServ } from "../../services/movieService";
import { userServ } from "../../services/userService";
import {
  BOOK_TICKET,
  GET_BANNER,
  GET_LIST_SEAT,
  GET_MOVIELIST,
  GET_MOVIETAB,
  GET_USER_PROFILE,
  GET_USER_TICKET,
  UPDATE_USER_PROFILE,
} from "../constants/constants";

export const bookTicketAction = (seat, thongTinPhim) => ({
  type: BOOK_TICKET,
  seat,
  thongTinPhim,
});
export const getListTheatre = (listTheatre) => ({
  type: GET_LIST_SEAT,
  listTheatre,
});
//BANNER HOMEPAGE
export const getMovieBannerAction = () => {
  return async (dispatch) => {
    try {
      let res = await movieServ.getMovieBanner();
      if (res.status === 200) {
        dispatch({
          type: GET_BANNER,
          banner: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//LIST MOVIE HOMEPAGE
export const getListMovieAction = (movieList) => {
  return {
    type: GET_MOVIELIST,
    movieList,
  };
};
//TAB MOVIE HOMEPAGE
export const getScheduleMovieByTheatreAction = () => {
  try {
    return async (dispatch) => {
      let res = await movieServ.getScheduleMovieByTheatre();
      if (res.status === 200) {
        dispatch({
          type: GET_MOVIETAB,
          movieTab: res.data.content,
        });
      }
    };
  } catch (err) {
    console.log(err);
  }
};
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
      if ((res.status = 200)) {
        await dispatch({
          type: UPDATE_USER_PROFILE,
          userProfile: values,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update Profile Successful",
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
//USER PROFILE TICKET HOMEPAGE
export const userTicketAction = () => {
  return async (dispatch) => {
    try {
      let res = await userServ.userTicket();
      if ((res.status = 200)) {
        dispatch({
          type: GET_USER_TICKET,
          userTicket: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
