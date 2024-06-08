import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Button from "../components/Button";
import BlogDiscription from "../components/BlogDiscription";



export default function Tags() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [selected, setSelected] = useState([]);
    const [blogs, setBlogs] = useState([])
    const tags = useSelector(state => state.tags)

    const setTags = (e) => {
        setSelected(e)
        setSearchParams({ tag: e.map(tag => tag.value) })
    }

    useEffect(() => {
        if (searchParams.size != 0) {
            getBlogs()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (searchParams.size != 0) {
            getBlogs()
        }
    }

    const getBlogs = async () => {
        await fetch(`${import.meta.env.VITE_URL}/blog/tag`, {
            method: "POST",
            body: JSON.stringify({ tags: searchParams.getAll("tag") }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (response.ok) return response.json()
                throw (response.json())
            })
            .then(({ blogs }) => {
                setBlogs(blogs)
            })
            .catch(error => console.log('error', error));

    }

    return <div className="space-y-6 px-4 min-h-screen">
        <form className="mx-auto w-full pt-4 md:pt-32 md:w-3/5 max-w-3xl grid grid-cols-6 gap-4" onSubmit={handleSubmit}>
            <div className="rounded-3xl bg-white dark:bg-dark font-sans col-span-6 md:col-span-5">
                <MultiSelect options={tags} className="dark" value={selected} onChange={setTags} />
            </div>

            <Button Class={'col-span-2 col-start-5 md:col-span-1'} type="submit">Search</Button>

        </form>
        {
            !!blogs[0] &&
            <>
                <p className="text-center font-bold">Found {blogs.length} blogs</p>
                <div className="flex flex-col gap-6 mx-auto md:w-3/4 max-w-3xl">
                    {blogs.map(blog => (
                        <div key={blog._id} className="grid grid-cols-4 cursor-pointer gap-6 mx-auto bg-white dark:bg-dark p-4 rounded-md transition-colors hover:dark:border-white hover:border-black border-transparent border-2 " onClick={() => navigate(`/Blog/${blog._id}`)}>
                            <img className="w-full aspect-square object-cover col-span-1 rounded-md" src={`${import.meta.env.VITE_URL}/assets/${blog.blogPicturePath}`} alt={blog.title} />
                            <div className={'col-span-3 '}>
                                <BlogDiscription blog={blog} />
                            </div>
                        </div>
                    ))}
                </div>
            </>
        }
    </div>

}