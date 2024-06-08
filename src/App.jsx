import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Home from './pages/Home'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile'
import Tags from './pages/Tags'
import Blog from './pages/Blog'
import Edit from './pages/Edit'
import About from './pages/About'

import Nav from './components/Nav'
import { setBlogs, setTags } from './state'
import Footer from './components/Footer'

function App() {
  const mode = useSelector(state => state.mode)
  if (mode === 'dark') document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')

  const dispatch = useDispatch()

  const getFeedBlogs = async () => {
    return await fetch(`${import.meta.env.VITE_URL}/blog`)
      .then(response => {
        if (response.ok) return response.json()
        throw (response.json())
      })
      .then(result => {
        dispatch(setBlogs(result))
      })
      .catch(error => console.log('error', error));
  }
  const getTags = async () => {
    return await fetch(`${import.meta.env.VITE_URL}/tag`)
      .then(response => {
        if (response.ok) return response.json()
        throw (response.json())
      })
      .then(result => {
        dispatch(setTags(result))
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    Promise.all([
      getFeedBlogs(),
      getTags()
    ])
  }, [])
  const isAuth = useSelector(state => state.token)
  const { pathname } = useLocation()

  return (
    <>
      <div className='flex flex-col min-h-screen justify-between'>
        <div className="">
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='/Blog/:blogId' element={<Blog />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/Tags' element={<Tags />} />
            <Route path='/About' element={<About />} />
            <Route path='/edit' element={isAuth ? <Edit /> : <Navigate to={'/login'} />} />
          </Routes>
        </div>
        {
          pathname != '/login' &&
          <Footer />
        }
      </div>
    </>
  )
}
export default App
