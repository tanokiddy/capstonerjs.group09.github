import { LOADING_OFF, LOADING_ON } from "./constants/constants";

export const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ON: {
      return { ...state, isLoading: true };
    }
    case LOADING_OFF: {
      return { ...state, isLoading: false };
    }
    default:
      return { ...state };
  }
};
