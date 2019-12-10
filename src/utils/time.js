export const data = {

  getDate() {
    const currentDate = new Date();
    const formatterDate = new Intl.DateTimeFormat("ru");

    return formatterDate.format(currentDate);
  },

  getTime() {

    const currentTime = new Date();
    const formatterTime = new Intl.DateTimeFormat("ru", {
      hour: 'numeric',
      minute: 'numeric'
    });

    return formatterTime.format(currentTime);
  }
};
