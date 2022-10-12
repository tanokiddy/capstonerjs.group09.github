const USERMOVIE = "USERMOVIE";
export const localServ = {
  user: {
    setDataUser: (dataUser) => {
      let jsonData = JSON.stringify(dataUser);
      localStorage.setItem(USERMOVIE, jsonData);
    },
    getDataUser: () => {
      let jsonData = localStorage.getItem(USERMOVIE);
      if (jsonData) {
        return JSON.parse(jsonData);
      } else {
        return;
      }
    },
    removeDataUser: () => {
      localStorage.removeItem(USERMOVIE);
    },
  },
};
