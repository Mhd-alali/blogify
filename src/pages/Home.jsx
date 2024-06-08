import { useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import BlogDiscription from "../components/BlogDiscription"
import Button from '../components/Button'

export default function Home() {
    const blogs = useSelector(state => state.blogs)
    const [isMobile, setIsMobile] = useState(innerWidth < 768)
    window.addEventListener('resize', () => {
        setIsMobile(innerWidth < 768)
    })
    const navigate = useNavigate()


    return (
        <div className="container ">
            {blogs[0] &&
                <div className="grid gap-6">

                    {isMobile ?
                        <div key={blogs[0]._id} className="grid grid-cols-4 cursor-pointer gap-6 mx-auto bg-white dark:bg-dark p-4  rounded-md transition-colors hover:dark:border-white hover:border-black border-transparent border-2" onClick={() => navigate(`/Blog/${blogs[0]._id}`)}>
                            <img onClick={() => navigate(`/Blog/${blogs[0]._id}`)} className="w-full aspect-square object-cover col-span-1 rounded-md" src={`${import.meta.env.VITE_URL}/assets/${blogs[0].blogPicturePath}`} alt={blogs[0].title} />
                            <div className={'col-span-3'}>
                                <BlogDiscription blog={blogs[0]} />
                            </div>
                        </div>
                        :
                        <div key={blogs[0]._id} className="relative bg-center bg-cover cursor-pointer bg-no-repeat md:pb-10 md:pl-10 rounded-md" style={{ backgroundImage: `url(${import.meta.env.VITE_URL}/assets/${blogs[0].blogPicturePath})` }} onClick={() => navigate(`/Blog/${blogs[0]._id}`)}>
                            <div className="w-2/6 child:px-4 child:py-10 child:bg-white dark:child:bg-black child:rounded-b-lg">
                                <BlogDiscription blog={blogs[0]} />
                            </div>
                        </div>
                    }

                    <div className="flex flex-col gap-6 mx-auto md:w-3/4 max-w-6xl">
                        {blogs.slice(1).map(blog => (
                            <div key={blog._id} className="grid grid-cols-4 cursor-pointer gap-6 mx-auto bg-white dark:bg-dark p-4 rounded-md transition-colors hover:dark:border-white hover:border-black border-transparent border-2 " >
                                <img onClick={() => navigate(`/Blog/${blog._id}`)} className="w-full aspect-square object-cover col-span-1 rounded-md" src={`${import.meta.env.VITE_URL}/assets/${blog.blogPicturePath}`} alt={blog.title} />
                                <div className={'col-span-3 '}>
                                    <BlogDiscription blog={blog} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mx-auto w-max">
                        <Button>
                            <div className="flex items-center">
                                <span className="w-32">Load More</span>
                                
                            </div>
                        </Button>
                    </div>
                </div>
            }

        </div>
    )
}


export function SvgSpinnersRingResize(loading, props) {
    return (

        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <g stroke="currentColor">
                <circle cx="12" cy="12" r="9.5" fill="none" strokeLinecap="round" strokeWidth="3">
                    <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150">
                    </animate>
                    <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59">
                    </animate>
                </circle>
                <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12">
                </animateTransform>
            </g>
        </svg>
    )
}