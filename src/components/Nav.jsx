import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setlogout, toggleMode } from './../state'

export default function Nav() {
    const [isExpanded, setIsExpanded] = useState(innerWidth > 768)
    const [menuExpanded, setMenuExpanded] = useState(false)

    const user = useSelector(state => state.user)
    const mode = useSelector(state => state.mode)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    window.onresize = () => {
        setIsExpanded(innerWidth > 768)
    }
    window.onclick = (e) => {
        if (e.target != document.getElementById('avatar')) {
            setMenuExpanded(false)
        } else {
            setMenuExpanded(!menuExpanded)
        }
    }
    // eslint-disable-next-line no-unused-vars
    const classes = ['opacity-100', 'opacity-0', 'pointer-events-none']

    return (
        <nav className="font-serif bg-white dark:bg-dark py-4 mb-6 tracking-wide ">
            <div className="container flex flex-col md:flex-row items-center gap-10 relative">
                <div className="absolute cursor-pointer flex flex-col gap-1 right-10 visible md:invisible" onClick={() => setIsExpanded(!isExpanded)}>
                    <span className="w-8 h-1 inline-block bg-black dark:bg-white"></span>
                    <span className="w-8 h-1 inline-block bg-black dark:bg-white"></span>
                    <span className="w-8 h-1 inline-block bg-black dark:bg-white"></span>
                </div>

                <Link to={'/'}>
                    <h1 className="relative font-bold text-3xl text-accent">
                        Blogify.
                    </h1>
                </Link>

                {
                    isExpanded
                    && <>
                        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
                            <ul className="flex flex-col md:flex-row gap-10 child:w-14">
                                <li><Link to={'/'} className={`cursor-pointer ${pathname == "/" ? 'font-bold' : ''}`}>Home</Link></li>
                                <li><Link to={'/tags'} className={`cursor-pointer ${pathname == "/tags" ? 'font-bold' : ''}`}>Tags</Link></li>
                                <li><Link to={'/about'} className={`cursor-pointer ${pathname == "/about" ? 'font-bold' : ''}`}>About</Link></li>
                            </ul>

                            <div className="flex flex-col items-center md:flex-row gap-8">
                                {
                                    mode === 'dark' ?
                                        <svg className="cursor-pointer transition-colors w-10 fill-dark dark:fill-light p-3 hover:bg-light hover:dark:bg-neutral-800 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => dispatch(toggleMode())}>
                                            <path d="M11 0L11 3L13 3L13 0L11 0 z M 4.2226562 2.8085938L2.8085938 4.2226562L4.9296875 6.34375L6.34375 4.9296875L4.2226562 2.8085938 z M 19.777344 2.8085938L17.65625 4.9296875L19.070312 6.34375L21.191406 4.2226562L19.777344 2.8085938 z M 12 5 A 7 7 0 0 0 5 12 A 7 7 0 0 0 12 19 A 7 7 0 0 0 19 12 A 7 7 0 0 0 12 5 z M 0 11L0 13L3 13L3 11L0 11 z M 21 11L21 13L24 13L24 11L21 11 z M 4.9296875 17.65625L2.8085938 19.777344L4.2226562 21.191406L6.34375 19.070312L4.9296875 17.65625 z M 19.070312 17.65625L17.65625 19.070312L19.777344 21.191406L21.191406 19.777344L19.070312 17.65625 z M 11 21L11 24L13 24L13 21L11 21 z" />
                                        </svg>
                                        :
                                        <svg className="cursor-pointer transition-colors w-10 fill-dark dark:fill-light p-3 hover:bg-light hover:dark:bg-neutral-800 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => dispatch(toggleMode())}>
                                            <path d="M13.019,21.998c-3.729,0-7.313-2.093-9.032-5.673c-1.156-2.408-1.305-5.122-0.419-7.642c0.886-2.52,2.7-4.544,5.108-5.7 c1.543-0.741,3.261-1.073,4.976-0.96l0.382,1.001c-3.423,1.399-5.003,6.686-3.46,9.901l0,0c1.393,2.901,5.41,5.999,10.011,4.012 l0.607,0.795c-0.983,1.407-2.319,2.542-3.861,3.282C15.939,21.681,14.467,21.997,13.019,21.998z" />
                                        </svg>
                                }

                                {
                                    user ?
                                        <div>
                                            <img id="avatar" className="w-10 rounded-full aspect-square cursor-pointer object-cover" src={`${import.meta.env.VITE_URL}/assets/${user.picturePath}`} alt={user.firstName + " " + user.lastName} />

                                            {/* user Menu */}
                                            <div className={`min-w-[10rem] absolute font-sans transition-all z-10 bg-white dark:bg-neutral-950 right-6 rounded-md ${menuExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'} shadow-lg`}>
                                                <div className="border-b child:cursor-pointer border-neutral-300 dark:border-neutral-600 pb-2 py-2 px-4">
                                                    <h5 className="font-bold capitalize">{user.firstName} {user.lastName}</h5>
                                                    <h6 className="text-neutral-500 dark:text-light">@{user.userName}</h6>
                                                </div>

                                                <div className="py-2 child:px-4 child:py-1 child:cursor-pointer child:block child:transition-colors child-hover:bg-light dark:child-hover:bg-neutral-800 child:rounded-sm">
                                                    <Link to={'/profile'}>
                                                        Profile
                                                    </Link>
                                                    <Link to={'/edit'}>
                                                        Write a Blog
                                                    </Link>
                                                    <Link to={'/login'} onClick={() => dispatch(setlogout())}>
                                                        Sign Out
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <Link to={'/login'}>
                                            <Button >Login</Button>
                                        </Link>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </nav >
    )
}