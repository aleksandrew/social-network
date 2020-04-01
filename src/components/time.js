export const currentDate = {

    getDate (prevDate = 0) {
        const date = this._setPrevDate(prevDate);
        const formatterDate = new Intl.DateTimeFormat('en');

        return formatterDate.format(date);
    },

    getTime () {
        const currentTime = new Date();
        const formatterTime = new Intl.DateTimeFormat('en', {
            hour: 'numeric',
            minute: 'numeric',
        });

        return formatterTime.format(currentTime);
    },

    _setPrevDate (d) {
        const date = new Date();
        return date.setDate(date.getDate() - d);
    },
};
