import { LOADING_ON } from "../constants/constants";
import { LOADING_OFF } from "../constants/constants";

export const loadingOnAction = () => {
  return {
    type: LOADING_ON,
  };
};

export const loadingOffAction = () => {
  return {
    type: LOADING_OFF,
  };
};
