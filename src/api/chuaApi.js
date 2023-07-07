const { default: axiosClient } = require('./axiosClient');

const chuaApi = {
    getAll(config) {
        const url = 'listChua';
        return axiosClient.get(url, config);
    },
};

export default chuaApi;
