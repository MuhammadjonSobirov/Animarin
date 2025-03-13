import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/main-layout"
import HomePage from "../pages/home"
import Releases from "../pages/releases"
import Unit from "../pages/unit"
import Login from "../pages/login"
import Register from "../pages/register"
import Profile from "../pages/profile"
import Favorite from "../pages/favorite"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/unit/:id" element={<Unit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
