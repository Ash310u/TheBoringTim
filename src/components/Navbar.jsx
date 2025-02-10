import { Link } from "react-router-dom"
import NavLink from "./NavLink"

const Navbar = () => {
    const navLinks = [
        { path: '/Dashboard', label: "Dashboard" },
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
        <div className="bg-white/80 flex justify-between py-5 px-8">
            <div>
                <Link to="/" className="flex items-center font-bold text-xl">
                    <span className="bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent">
                        PeaceSync
                    </span>
                </Link>
            </div>
            <div className="flex justify-between">
                {content}
            </div>
        </div>
    )
}

export default Navbar;