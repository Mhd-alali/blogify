import { useSelector } from 'react-redux'
import Button from './Button'
import { Link } from 'react-router-dom'
export default function Footer() {
    const user = useSelector(state => state.user)

    return <footer className="font-serif bg-dark text-light tracking-wide mt-20 ">
        <div className="container py-4">
            {!user &&
                <>
                    <div className="flex flex-col border-b dark:border-light border-dark py-4 items-center space-y-6">
                        <p className='text-2xl'>Readdy to get started?</p>
                        <Link to={'/login'}>
                            <Button >Login</Button>
                        </Link>
                    </div>
                </>
            }
            <ul className='my-5 flex justify-between mx-auto w-1/3 font-sans'>
                <li><Link to={'/'} className="cursor-pointer" >Home</Link></li>
                <li><Link to={'/tags'} className="cursor-pointer"  >Tags</Link></li>
                <li><Link to={'/about'} className="cursor-pointer" >About</Link></li>
                <li><Link to={'/edit'} className="cursor-pointer" >Write a BLog</Link></li>
            </ul>
        </div>
        <div className='border-t py-2 font-sans text-sm text-center text-neutral-400 space-y-1'>
            <p className="">&#169; Copyright 2023 Blogify. all rights reserved.</p>
            <p className="text-sm">
                Created by
                <a href='https://muhammed-ali.vercel.app/' target='_blank' rel="noreferrer">
                    <span className="font-bold text-white pl-1">Muhammed alali</span>
                </a>
            </p>
        </div>
    </footer>
}


