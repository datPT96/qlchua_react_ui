import axiosClient from './axiosClient';

const userApi = {
    signin(data) {
        const url = '/auth/signin';
        console.log(data);
        return axiosClient.post(url, data);
    },
    signup(data) {
        const url = '/auth/signup';
        return axiosClient.post(url, data);
    },
    getUserById(id, config = {}) {
        const url = `/getPhatTu?id=${id}`;
        return axiosClient.get(url, config);
    },
    getAll(params, config = {}) {
        const url = '/timKiem';
        try {
            return axiosClient.get(url, { params }, config);
        } catch (error) {
            console.log(error);
        }
    },
    updateUser(id, data, config) {
        const url = `suaThongTin?idPhatTu=${id}`;
        return axiosClient.put(url, data, config);
    },
    deleteById(id, config = {}) {
        const url = `xoaPhatTu?idPhatTu=${id}`;
        return axiosClient.delete(url, config);
    },
};

export default userApi;
