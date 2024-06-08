import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Author from "../components/Author"

export default function Blog() {
    const [author, setAuthor] = useState(null)
    const { blogId } = useParams()
    const blog = useSelector(state => state.blogs.filter(blog => blog._id === blogId)[0])
    const createdAt = moment(blog.createdAt).format("MMMM D, YYYY")

    const getAuthor = async () => {
        const author = await fetch(`${import.meta.env.VITE_URL}/user/${blog.userId}`)
            .then(response => {
                if (response.ok) return response.json()
                throw (response.json())
            })
            .then(result => setAuthor(result.user))
            .catch(error => console.log('error', error));
        return author
    }

    useEffect(() => {
        getAuthor()
        scrollTo({ top: 0 })
    }, [])

    return (
        <div className="container">
            <img className="w-full object-cover h-80 rounded-md" src={`${import.meta.env.VITE_URL}/assets/${blog.blogPicturePath}`} alt={blog.title} />
            <div className="md:w-2/3 lg:w-1/2 mx-auto text-center space-y-4">
                <h2 className="font-serif font-bold text-3xl pt-4 capitalize">{blog.title}</h2>
                <p className="space-x-2 text-neutral-500 text-sm">
                    <Link to={`/profile/${blog.userId}`}>
                        <span className="capitalize transition-colors dark:hover:text-light hover:text-dark">{blog.userName}</span> 
                    </Link>
                    <span className="capitalize">.</span>
                    <span className="capitalize">{createdAt}</span>
                    <span className="capitalize">({blog.minutes} mins read)</span>
                </p>
                <p className="space-x-1 lowercase text-neutral-500">
                    {blog.tags.map((tag, idx) => <span key={idx}>#{tag}</span>)}
                </p>
                <div className="text-left font-semibold" dangerouslySetInnerHTML={{ __html: blog.body }} />
                <div className="py-20 space-y-4">
                    <p className="text-neutral-500 text-left">ABOUT THE AUTHOR</p>
                    {author && <Author author={author} />}
                </div>
            </div>
        </div>
    )
}