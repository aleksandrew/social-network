import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'dc0a73d6-165a-4b65-a95a-d314715fb16a',
    },
});

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => {
                return response.data;
            });
    },
    followUsers (userId = 5197) {
        return instance.post(`follow/${userId}`)
            .then((response) => {
                return response.data;
            });
    },
    unfollowUsers (userId = 5197) {
        return instance.delete(`follow/${userId}`)
            .then((response) => {
                return response.data;
            });
    },
};

export const profileAPI = {
    viewProfile (userId = 5197) {
        return instance.get(`profile/${userId}`)
            .then((response) => {
                return response;
            });
    },
    getStatus (userId = 5197) {
        return instance.get(`profile/status/${userId}`);
    },
    upadateStatus (status) {
        return instance.put('profile/status', { status });
    },
    updateProfileData (profileData) {
        return instance.put('profile', profileData);
    },
    updateImage (photo) {
        const formData = new FormData();
        formData.append('image', photo);

        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export const authAPI = {
    me () {
        return instance.get('auth/me');
    },
    login (email, password, rememberMe = false) {
        return instance.post('auth/login', {
            email,
            password,
            rememberMe,
        });
    },
    logout () {
        return instance.delete('auth/login');
    },
};
