import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Author from "../components/Author"
import { useSelector } from "react-redux"
import BlogDiscription from "../components/BlogDiscription"

export default function Profile() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [user, setUser] = useState(useSelector(state => state.user))
    const [blogs, setBlogs] = useState([])

    const getUser = async () => {
        if (userId) {
            await fetch(`${import.meta.env.VITE_URL}/user/${userId}`)
                .then(response => {
                    if (response.ok) return response.json()
                    throw (response.json())
                })
                .then(({ user }) => setUser(user))
                .catch(error => console.log('error', error));
        }
    }

    const getBlogs = async () => {
        const id = userId ? userId : user._id
        await fetch(`${import.meta.env.VITE_URL}/user/${id}/blog`)
            .then(response => {
                if (response.ok) return response.json()
                throw (response.json())
            })
            .then(({ blogs }) => setBlogs(blogs))
            .catch(error => console.log('error', error));
    }

    useState(() => {
        getUser()
        getBlogs()
    }, [])

    return <div className="container md:w-3/4 max-w-6xl">
        <div className=" mx-auto pb-10 child:bg-white child:w-full max-w-3xl">
            {user && <Author author={user} />}
        </div>
        <div className="flex flex-col gap-6 mx-auto ">
            {!!blogs[0] && blogs.map(blog => (
                <div key={blog._id} className="grid grid-cols-4 cursor-pointer gap-6 mx-auto bg-white dark:bg-dark p-4 rounded-md transition-colors hover:dark:border-white hover:border-black border-transparent border-2 " onClick={() => navigate(`/Blog/${blog._id}`)}>
                    <img className="w-full aspect-square object-cover col-span-1 rounded-md" src={`${import.meta.env.VITE_URL}/assets/${blog.blogPicturePath}`} alt={blog.title} />
                    <div className={'col-span-3 '}>
                        <BlogDiscription blog={blog} />
                    </div>
                </div>
            ))}
        </div>
    </div>
}