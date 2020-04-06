// outsource dependencies
import _ from 'lodash';

// local dependencies
import { MESSAGE } from '../constans/types';
import { currentDate } from '../components/time';

const initialState = {
    acquaintancesUser: [],
    messages: [
        { name: 'Mark Zuckerberg', id: 0, messages: [
            { date: currentDate.getDate(1), sendMessage: false, id: 1, time: '23:12:36', read: true, message: 'Hey.' },
            { date: currentDate.getDate(1), sendMessage: false, id: 2, time: '23:12:58', read: false, message: 'Your license to use react can be revoked if you compete with Facebook' },
            { date: currentDate.getDate(1), sendMessage: false, id: 3, time: '23:13:15', read: false, message: 'you knew about this?' },
            { date: currentDate.getDate(1), sendMessage: false, id: 4, time: '23:13:18', read: false, message: 'So you have to finish what you\'re doing!' },
        ],
        img: 'https://scontent.fhrk5-1.fna.fbcdn.net/v/t1.0-1/p240x240/79515135_10111007623880301_5111576226921709568_o.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_ohc=TQOe9CFVSxMAX9G_tPa&_nc_ht=scontent.fhrk5-1.fna&_nc_tp=6&oh=491d0ccbb6737e19d48600b9ad80c6e9&oe=5EA8A1B3',
        href: 'https://www.facebook.com/zuck',
        },
        { name: 'Elon Musk', id: 1, messages: [
            { date: currentDate.getDate(1), sendMessage: false, id: 1, time: '20:12:36', read: false, message: 'We have extra FDA-approved ventilators. Will ship to hospitals worldwide within Tesla delivery regions. Device & shipping cost are free. Only requirement is that the vents are needed immediately for patients, not stored in a warehouse. Please me or @Tesla know.' },
            { date: currentDate.getDate(1), sendMessage: false, id: 4, time: '20:13:18', read: false, message: 'https://twitter.com/elonmusk' },
            { date: currentDate.getDate(1), sendMessage: false, id: 4, time: '20:13:18', read: false, message: 'More on my twitter account ;)' },
        ],
        img: 'https://pbs.twimg.com/profile_images/1223183340171415552/XQcxk5Zb_400x400.jpg',
        },
        { name: 'Alexandrew', id: 6261, messages: [
            { date: currentDate.getDate(2), sendMessage: false, id: 1, time: '12:12:36', read: true, message: 'Hi' },
        ],
        href: '/profile/5197',
        },
        { name: 'John Doe', id: 99999, messages: [
            { date: currentDate.getDate(6), sendMessage: true, id: 1, time: '12:12:36', read: true, message: 'lorem' },
        ],
        },
    ],
};

export const selector = (state) => state.message;

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE.SET_MARK: {
            const markRead = _.map(state.messages, (dialog) => {
                if (dialog.id === +action.id) {
                    const newMessage = _.map(dialog.messages, (message) => {
                        if (message.read) {
                            return { ...message, read: false };
                        }

                        return { ...message, read: true };
                    });

                    return { ...dialog, messages: [...newMessage] };
                }

                return dialog;
            });

            return {
                ...state,
                messages: [...markRead],
            };
        }

        default:
            return state;
    }
};

export default messageReducer;
