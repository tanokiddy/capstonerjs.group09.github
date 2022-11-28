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
  UPLOAD_NEWMOVIE,
} from "./constants/constants";

export const initialState = {
  //Homepage
  banner: [],
  movieList: [],
  movieTab: [],
  //Booking page
  movieDetail_Schedule: {},
  seat: [],
  booking: {
    danhSachVe: [],
  },
  seatListInTheatre: {},
  //Admin
  movieSearchingList: [],
  movieEditing: {},
  //add new showtimes
  theatreSystem: [],
  theatre: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    //BOOKING PAGE
    case GET_MOVIE_DETAIL: {
      return { ...state, movieDetail_Schedule: action.movieDetail_Schedule };
    }
    case GET_LIST_SEAT: {
      return { ...state, seatListInTheatre: action.seatListInTheatre };
    }
    case CLICK_SEAT: {
      let cloneState = { ...state };
      let index = cloneState.seat.findIndex((item) => {
        return item.maGhe === action.seat.maGhe;
      });
      if (index === -1) {
        cloneState.seat.push(action.seat);
      } else {
        cloneState.seat.splice(index, 1);
      }
      cloneState.booking = {
        ...cloneState.booking,
        maLichChieu: action.thongTinPhim.maLichChieu,
      };
      let index1 = cloneState.booking.danhSachVe.findIndex((item) => {
        return item.maGhe === action.seat.maGhe;
      });
      if (index1 === -1) {
        cloneState.booking.danhSachVe.push({
          maGhe: action.seat.maGhe,
          giaVe: action.seat.giaVe,
        });
      } else {
        cloneState.booking.danhSachVe.splice(index1, 1);
      }
      state = cloneState;
      return { ...state };
    }
    case BOOK_TICKET_NOW: {
      let cloneSeatListInTheatre = { ...state.seatListInTheatre };
      let { thongTinPhim, danhSachGhe } = cloneSeatListInTheatre;
      if (thongTinPhim.maLichChieu === action.bookingState.maLichChieu) {
        let indexArray = action.bookingState?.danhSachVe?.map((itemDSV) =>
          danhSachGhe.findIndex((itemDSG) => itemDSG.maGhe === itemDSV.maGhe)
        );
        indexArray?.map((index) => {
          return (danhSachGhe[index].daDat = true);
        });
      }
      state.seatListInTheatre = cloneSeatListInTheatre;
      state.booking.danhSachVe = [];
      state.seat = [];
      return {
        ...state,
      };
    }
    //HOMEPAGE
    case GET_BANNER: {
      return { ...state, banner: action.banner };
    }
    case GET_MOVIELIST: {
      return { ...state, movieList: action.movieList };
    }
    case GET_MOVIETAB: {
      return { ...state, movieTab: action.movieTab };
    }
    //ADMIN MOVIE
    case DELETE_MOVIE: {
      let cloneMovieList = state.movieList.filter((item) => {
        return item.maPhim !== action.movieId;
      });
      state.movieList = cloneMovieList;

      let cloneMovieSearchingList = state.movieSearchingList.filter((item) => {
        return item.maPhim !== action.movieId;
      });
      state.movieSearchingList = cloneMovieSearchingList;

      return { ...state };
    }
    case UPDATE_MOVIE: {
      return { ...state, movieList: action.movieList };
    }
    case SEARCH_MOVIE: {
      return { ...state, movieSearchingList: action.movieSearchingList };
    }
    case UPLOAD_NEWMOVIE: {
      return { ...state, movieList: action.movieList };
    }
    case MOVIE_EDITING: {
      return { ...state, movieEditing: action.movieEditing };
    }
    //Add new showtimes
    case GET_THEATRESYSTEM: {
      return { ...state, theatreSystem: action.theatreSystem };
    }
    case GET_THEATRE: {
      return { ...state, theatre: action.theatre };
    }
    default:
      return { ...state };
  }
};
