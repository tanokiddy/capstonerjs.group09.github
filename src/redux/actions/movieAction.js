import { movieServ } from "../../services/movieService";
import {
  BOOK_TICKET,
  GET_BANNER,
  GET_LIST_SEAT,
  GET_MOVIELIST,
  GET_MOVIETAB,
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
