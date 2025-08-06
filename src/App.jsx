import React from 'react'
import Login from './component/Login'
import Register from './component/register'
import Profile from './component/Profile'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CreateProfile from './pages/CreateProfile'
const App = () => {
  return (
<>
<BrowserRouter>


<nav>
  <Link to="/register">Register</Link> | 

  <Link to="/login">Login</Link>|
<Link to="/createprofile">Create Profile</Link>|
<Link to="/profile">Profile</Link>


</nav>
<Routes>
  <Route path="/register" element={<Register/>}/>

   <Route path="/login" element={<Login />} />
   <Route path="/createprofile" element={<CreateProfile />} />

  <Route path="/profile" element={<Profile />} />

</Routes>
</BrowserRouter>
</>
  )
}

export default App