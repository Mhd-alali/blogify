import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from "../components/Button";
import Input from "../components/Input";
import Fileupload from "../components/Fileupload";

import { setLogin } from '../state'

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [pageType, setPageType] = useState('login')
    const [image, setImage] = useState(null)
    const [firstName, setFirstName] = useState({ value: "", error: null })
    const [lastName, setLastName] = useState({ value: "", error: null })
    const [userName, setUserName] = useState({ value: "", error: null })
    const [description, setDescription] = useState({ value: "", error: null })
    const [email, setEmail] = useState({ value: "", error: null })
    const [password, setPassword] = useState({ value: "", error: null })
    const [error, setError] = useState("")

    const resetform = () => {
        setPageType({ value: '', error: null })
        setImage({ value: '', error: null })
        setFirstName({ value: '', error: null })
        setLastName({ value: '', error: null })
        setUserName({ value: '', error: null })
        setDescription({ value: '', error: null })
        setEmail({ value: '', error: null })
        setPassword({ value: '', error: null })
    }

    const login = async (values) => {
        await fetch(`${import.meta.env.VITE_URL}/auth/login`, {
            method: 'POST',
            body: values,
            headers: { 'Content-Type': 'application/json' }
        }).then(async (response) => {
            if (response.ok) return response.json()
            throw await response.json()
        }).then(({ user, token }) => {
            dispatch(setLogin({ user, token }))
            navigate('/')
        }).catch(error => {
            setError(error.message)
        })
    }

    const register = async (values) => {
        await fetch(`${import.meta.env.VITE_URL}/auth/register`, {
            method: 'POST',
            body: values,
        }).then(response => {
            if (response.ok) return response.json()
            throw (response.json())
        }).then(() => {
            resetform()
            setPageType("login")
        }).catch(error => {
            console.log(error);
            setError(error.message)
        })
    }
    function isEmail(emailAddress) {
        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        return emailRegex.test(emailAddress);
    }

    const validate = () => {
        let valid = true;
        if (!email.value) { valid = false; setEmail({ value: email.value, error: 'email connot be empty' }) }
        if (!isEmail(email.value)) { valid = false; setEmail({ value: email.value, error: 'invalid Email' }) }
        if (!password.value) { valid = false; setPassword({ value: password.value, error: 'password connot be empty' }) }
        if (pageType === 'register') {
            if (!firstName.value) { valid = false; setFirstName({ value: firstName.value, error: 'firstName connot be empty' }) }
            if (!lastName.value) { valid = false; setLastName({ value: lastName.value, error: 'lastName connot be empty' }) }
            if (!userName.value) { valid = false; setUserName({ value: userName.value, error: 'userName connot be empty' }) }
        }
        return valid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        if (pageType === 'login') {
            login(JSON.stringify({
                email: email.value,
                password: password.value
            }))
        }
        else if (pageType === 'register') {
            const formdata = new FormData()
            formdata.append('picture', image)
            formdata.set('picturePath', image.name)
            formdata.set('firstName', firstName.value)
            formdata.set('lastName', lastName.value)
            formdata.set('userName', userName.value)
            formdata.set('description', description.value)
            formdata.set('email', email.value)
            formdata.set('password', password.value)
            register(formdata)
        }
    }

    return <div className="px-10 md:px-0">
        <div className="w-full md:w-2/5 md:mx-auto px-10 text-center space-y-6 py-20 bg-white dark:bg-dark rounded-md">
            <span className="space-y-2">
                <h2 className="font-serif text-3xl font-bold">Welcome back!</h2>
            </span>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
                {
                    pageType === 'register'
                    &&
                    <>
                        <Input variant={'primary'} placeholder="FirstName" type={'text'} Class={'col-span-1 '} value={firstName.value} onChange={(e) => setFirstName({ value: e.target.value })} error={firstName.error} />
                        <Input variant={'primary'} placeholder="LastName" type={'text'} Class={'col-span-1'} value={lastName.value} onChange={(e) => setLastName({ value: e.target.value })} error={lastName.error} />
                        <Input variant={'primary'} placeholder="UserName" type={'text'} Class={'col-span-2'} value={userName.value} onChange={(e) => setUserName({ value: e.target.value })} error={userName.error} />
                        <textarea placeholder="Description" type={'text'} className={`text-base block w-full  border-b border-b-black dark:border-b-light bg-transparent px-1 py-2 outline-none col-span-2`} value={description.value} onChange={(e) => setDescription({ value: e.target.value })} />
                        <Fileupload onDrop={(files) => setImage(files[0])} file={image} />
                    </>
                }
                <Input variant={'primary'} placeholder="Email" type={'email'} Class={'col-span-2'} value={email.value} onChange={(e) => setEmail({ value: e.target.value })} error={email.error} />
                <Input variant={'primary'} placeholder="Password" type="password" Class={'col-span-2'} value={password.value} onChange={(e) => setPassword({ value: e.target.value })} error={password.error} />
                <Button Class={'w-full text-xl font-serif font-normal py-2 col-span-2 mt-6'} type={'submit'}>{
                    pageType === 'login' ? "Login" : 'Register'
                }</Button>
            </form>
            {error &&
                <p className="text-red-600 font-bold">{error}</p>
            }
            <p className="cursor-pointer font-bold text-accent hover:text-opacity-80" onClick={() => { setPageType(pageType === 'login' ? 'register' : 'login'); }}>
                {pageType === 'login' ? "Dont have an account ? Sign up here." : "Allready have an account ? Login here."}
            </p>
        </div>
    </div>
}