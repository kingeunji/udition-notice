import axios from 'axios'

const instance = axios.create({
    baseURL: "http://192.168.0.44:8081/",
});

// policy
export const policy = {
    list(formData) {
        return instance.post('api/terms/list', formData)
    }
}

export const versionList = {
    list(formData) {
        return instance.post('api/terms/versionList', formData)
    }
}
