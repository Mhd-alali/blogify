import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MultiSelect } from "react-multi-select-component";

import { setBlog } from '../state'
import Editor from "../components/Editor";
import Input from "../components/Input";
import Button from "../components/Button";
import Fileupload from "../components/Fileupload";

export default function Edit() {
    const [html, setHtml] = useState()
    const [image, setImage] = useState()
    const [title, setTitle] = useState({ value: '', error: null })
    const [selected, setSelected] = useState([]);

    const tags = useSelector(state => state.tags)
    const token = useSelector(state => state.token)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onHtmlChanged = (html) => {
        setHtml(html)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('picture', image)
        formdata.set('blogPicturePath', image.name)
        formdata.set('body', html)
        formdata.set('title', title.value)
        // eslint-disable-next-line no-unused-vars
        formdata.set('tags', selected.map(({ label, value }) => value))

        await fetch(`${import.meta.env.VITE_URL}/blog`, {
            method: 'POST',
            body: formdata,
            headers: { Authorization: `Bearer ${token}` },
        }).then(response => {
            if (response.ok) return response.json()
            throw (response.json())
        }).then(({ blog }) => {
            dispatch(setBlog({ blog }))
            navigate('/')
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <div className="container">
            <form className="w-full md:w-4/5 lg:w-2/3 mx-auto space-y-4 font-serif flex flex-col" onSubmit={handleSubmit}>
                <Input variant={"secondary"} placeholder={'Blog Title'} Class={'first:child:text-3xl'} value={title.value} onChange={(e) => setTitle({ value: e.target.value })} /*error={title.error}*/ />
                <div className="rounded-md bg-white dark:bg-dark font-sans">
                    <MultiSelect options={tags} value={selected} onChange={setSelected} className="dark" />
                </div>

                <div className="font-sans pt-2">
                    <Editor onHtmlChanged={onHtmlChanged} />
                </div>
                <div className="">
                    <Fileupload file={image} onDrop={(files) => setImage(files[0])} />
                </div>
                <Button type={'submit'} Class={'self-end'}>Post</Button>
            </form>
        </div>
    )
}