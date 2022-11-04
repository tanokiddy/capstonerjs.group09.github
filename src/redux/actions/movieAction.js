import Swal from "sweetalert2";
import { movieServ } from "../../services/movieService";
import {
  BOOK_TICKET_NOW,
  CLICK_SEAT,
  GET_BANNER,
  GET_LIST_SEAT,
  GET_MOVIELIST,
  GET_MOVIETAB,
  GET_MOVIE_DETAIL,
} from "../constants/constants";

//HOMEPAGE - BANNER
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
//HOMEPAGE - LIST MOVIE
export const getListMovieAction = (movieList) => {
  return {
    type: GET_MOVIELIST,
    movieList,
  };
};
//HOMEPAGE - TAB MOVIE
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

//BOOKING PAGE - BOOKING BY MOVIE
export const getScheduleInfoByIdMovieAction = (id) => {
  return async (dispatch) => {
    try {
      let res = await movieServ.getScheduleInfoByIdMovie(id);
      if (res.status === 200) {
        dispatch({
          type: GET_MOVIE_DETAIL,
          movieDetail_Schedule: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const getListSeatInTheatreAction = (id) => {
  return async (dispatch) => {
    try {
      let res = await movieServ.getListTheatre(id);
      if (res.status === 200) {
        dispatch({
          type: GET_LIST_SEAT,
          seatListInTheatre: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const handleBookingNowAction = (bookingState) => {
  return async (dispatch) => {
    try {
      let res = await movieServ.postBookingTicket(bookingState);
      if (res.status === 200) {
        await dispatch({
          type: BOOK_TICKET_NOW,
          bookingState,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Booking Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      // }
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "success",
        title: err.responde.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
export const ClickToSeatAction = (seat, thongTinPhim) => ({
  type: CLICK_SEAT,
  seat,
  thongTinPhim,
});
