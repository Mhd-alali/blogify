import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    tags: [],
    blogs: []
}

const slice = createSlice({
    initialState,
    name: "store",
    reducers: {
        toggleMode: (state) => {
            state.mode = state.mode == 'dark' ? 'light' : 'dark'
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setlogout: (state) => {
            state.user = null
            state.token = null
        },
        setBlogs: (state, action) => {
            state.blogs = action.payload.blogs
        },
        setBlog: (state, action) => {
            state.blogs.push(action.payload.blog)
        },
        setTags: (state, action) => {
            state.tags = action.payload.tags
        },
        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter(blog => blog._id != action.payload.blog._id)
        }
    }
})

export const { deleteBlog, setBlog, setBlogs, setLogin, setlogout, toggleMode, setTags } = slice.actions
export default slice.reducer