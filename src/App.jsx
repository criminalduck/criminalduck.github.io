import { Routes, Route } from "react-router-dom";

import Navbar from "./components/main/Navbar.jsx";
import Footer from "./components/main/Footer.jsx";

import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import NotFoundPage from "./pages/NotFoundPage";

import './styles/normalize.css';
import './styles/global.css';

export default function App() {
    return (
        <>
            <Navbar/>

            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/projects" element={<ProjectsPage/>} />
                <Route path="/projects/:projectId" element={<ProjectsPage/>} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer/>
        </>
    );
}