import React from 'react'
import Login from './component/Login'
import Register from './component/Register'
import Profile from './component/Profile'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CreateProfile from './pages/CreateProfile'
import Dashboard from './pages/Dashboard'
import PublicFeed from './pages/PublicFeed'
import CreatePost from './component/CreatePost'
const App = () => {
return(
<>
<BrowserRouter>


<nav>
  <Link to="/register">Register</Link> |   
  <Link to="/login">Login</Link> |   




</nav>
<Routes>
  
  <Route path="/register" element={<Register/>}/>

   <Route path="/login" element={<Login />} />
   <Route path="/createprofile" element={<CreateProfile />} />
<Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<PublicFeed />} />


  <Route path="/profile" element={<Profile />} />
   <Route path="/dashboard" element={<Dashboard />}>
       </Route>

</Routes>
</BrowserRouter>
</>
  )
}

export default App