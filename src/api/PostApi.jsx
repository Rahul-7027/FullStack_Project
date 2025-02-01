
import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const GetPost = () => {
    return api.get("/posts")
}

export const DeletPost = (id) => {
    return api.delete(`/posts/${id}`)
}
export const PutPost = (id,Updated) => {
    return api.put(`/posts/${id}`,Updated)
}
export const AddPost = (post) => {
    return api.post(`/posts`,post)
}