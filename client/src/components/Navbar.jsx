import { Link } from "react-router-dom"
import NavLink from "./features/NavLink"

const Navbar = () => {
    const navLinks = [
        { path: '/dashboard', label: "Dashboard" },
        { path: '/moodmap', label: "MoodMap" },
        { path: '/profile', label: "Profile" },
    ]

    const content = navLinks.map((link) => {
        return (
            <NavLink key={link.path} to={link.path}>
                {link.label}
            </NavLink>
        )
    })

    return (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg flex justify-between items-center py-6 px-10">
            <div>
                <Link to="/" className="flex items-center font-bold text-xl transition-all duration-300 hover:scale-105">
                        <span className="bg-gradient-to-r from-violet-300 to-pink-200 bg-clip-text text-transparent">
                            PeaceSync
                        </span>
                </Link>
            </div>
            <div className="flex justify-between gap-6">
                {content}
            </div>
        </div>
    )
}

export default Navbar;