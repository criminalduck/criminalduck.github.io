import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import Navbar from "./components/main/Navbar.jsx";
import Footer from "./components/main/Footer.jsx";

import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import NotFoundPage from "./pages/NotFoundPage";

import './styles/normalize.css';
import './styles/global.css';
import {useEffect} from "react";

export default function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <Navbar/>
            <motion.div key={location.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:projectId" element={<ProjectsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </motion.div>
            <Footer/>
        </>
    );
}