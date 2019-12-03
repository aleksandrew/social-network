import * as axios from "axios/index";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "dc0a73d6-165a-4b65-a95a-d314715fb16a"
  }
});

export const profileAPI = {
  viewProfile(userId = 2) {
    return instance.get(`profile/${userId}`)
      .then(response => {
        return response
      })
  },
  getStatus(userId = 2) {
    return instance.get(`profile/status/${userId}`)
  },
  upadateStatus(status) {
    return instance.put(`profile/status`, {
      status
    })
  }
};
