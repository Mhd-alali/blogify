import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'

/* eslint-disable react/prop-types */
export default function BlogDiscription({ blog, ...props }) {
    const navigate = useNavigate()
    const createdAt = moment(blog.createdAt).format("MMMM D, YYYY")
    
    return (
        <div {...props} className='flex flex-col justify-center h-full gap-2'>
            <p className="space-x-2 uppercase text-neutral-500">
                {blog.tags.map((tag, idx) => <span key={idx}>{tag}</span>)}
            </p>
            <h3 className="font-serif font-bold text-2xl text-accent hover:text-opacity-80 transition-colors" onClick={() => navigate(`/Blog/${blog._id}`)}>{blog.title}</h3>
            <p className="space-x-2 text-neutral-500 text-sm">
                <Link to={`/profile/${blog.userId}`}>
                    <span className="capitalize transition-colors dark:hover:text-light hover:text-dark">{blog.userName}</span>
                </Link>
                <span className="capitalize">•</span>
                <span className="capitalize">{createdAt}</span>
                <span className="capitalize">({blog.minutes} min read)</span>
            </p>
            <div className='md:line-clamp-3 line-clamp-2 2xl:line-clamp-4 font-semibold' dangerouslySetInnerHTML={{ __html: blog.body }} />
        </div>
    )
}