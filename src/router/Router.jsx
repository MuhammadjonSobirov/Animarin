import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/main-layout"
import HomePage from "../pages/home"
import Releases from "../pages/releases"
import Unit from "../pages/unit"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/unit/:id" element={<Unit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
