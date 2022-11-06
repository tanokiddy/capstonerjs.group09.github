import Swal from "sweetalert2";
import { movieServ } from "../../services/movieService";
import {
  BOOK_TICKET_NOW,
  CLICK_SEAT,
  DELETE_MOVIE,
  GET_BANNER,
  GET_LIST_SEAT,
  GET_MOVIELIST,
  GET_MOVIETAB,
  GET_MOVIE_DETAIL,
  GET_THEATRE,
  GET_THEATRESYSTEM,
  MOVIE_EDITING,
  SEARCH_MOVIE,
  UPDATE_MOVIE,
} from "../constants/constants";

//HOMEPAGE - BANNER
export const getMovieBannerAction = () => {
  return async (dispatch) => {
    try {
      let res = await movieServ.getMovieBanner();
      if (res.status === 200) {
        await dispatch({
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
export const getListMovieAction = () => {
  return async (dispatch) => {
    try {
      let res = await movieServ.getListMovie();
      if (res.status === 200) {
        await dispatch({
          type: GET_MOVIELIST,
          movieList: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//HOMEPAGE - TAB MOVIE
export const getScheduleMovieByTheatreAction = () => {
  try {
    return async (dispatch) => {
      let res = await movieServ.getScheduleMovieByTheatre();
      if (res.status === 200) {
        await dispatch({
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
        await dispatch({
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
        await dispatch({
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
        await Swal.fire({
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
      await Swal.fire({
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
//ADMIN MOVIE
//-DELETE MOVIE
export const handleDeleteMovieAction = (movieId) => {
  return async (dispatch) => {
    try {
      let res = await movieServ.deleteMovie(movieId);
      if (res.status === 200) {
        await dispatch({
          type: DELETE_MOVIE,
          movieId,
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
        icon: "success",
        title: err.response.data.content,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
//-EDIT MOVIE
export const updateMovieUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let res = await movieServ.updateMovieUpload(formData);
      if (res.status === 200) {
        let res1 = await movieServ.getListMovie();
        await dispatch({
          type: UPDATE_MOVIE,
          movieList: res1.data.content,
        });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Update Film Successful",
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
//-
export const movieEditingAction = (movieEditing) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: MOVIE_EDITING,
        movieEditing,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
//-SEARCH MOVIE
export const getListMovieByIdAction = (id) => {
  return async (dispatch) => {
    try {
      let res = await movieServ.getListMoviebyId(id);
      if (res.status === 200) {
        await dispatch({
          type: SEARCH_MOVIE,
          movieSearchingList: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//-UPLOAD NEW MOVIE
export const uploadNewMovieAction = (formData) => {
  return async (dispatch) => {
    try {
      let res = await movieServ.uploadMovie(formData);
      if (res.status === 200) {
        let res1 = await movieServ.getListMovie();
        await dispatch({
          type: UPDATE_MOVIE,
          movieList: res1.data.content,
        });
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Add New Film Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/admin/films/filmManagement";
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
//-ADD NEW SHOWTIMES
export const getTheatreSystemAction = () => {
  return async (dispatch) => {
    try {
      let res = await movieServ.getTheatreSystem();
      if (res.status === 200) {
        await dispatch({
          type: GET_THEATRESYSTEM,
          theatreSystem: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const getTheatreAction = (value) => {
  return async (dispatch) => {
    try {
      let res = await movieServ.getTheatre(value);
      if (res.status === 200) {
        await dispatch({
          type: GET_THEATRE,
          theatre: res.data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const addShowTimesAction = (values) => {
  return async (dispatch) => {
    try {
      let res = await movieServ.addShowtimes(values);
      if (res.status === 200) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Showtimes Successful",
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
