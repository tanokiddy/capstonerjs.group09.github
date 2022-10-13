import { BOOK_TICKET } from "../constants/constants";

export const bookTicketAction = (seat, thongTinPhim) => ({
  type: BOOK_TICKET,
  seat,
  thongTinPhim,
});
