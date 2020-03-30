import axios from 'axios'

const instance = axios.create({
    baseURL: "http://192.168.0.44:8081",
});

export const listPage = {
    list(formData) {
        // var bodyFormData = new FormData();
        // bodyFormData.append('requestPage', num);
        // bodyFormData.append('noticeType', num);
        // bodyFormData.set("noticeType", category);
        // console.log("num", num)
        return instance.post("/api/notice/list", formData)
    }
}

