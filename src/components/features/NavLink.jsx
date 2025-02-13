import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ to, children }) => {
    const location = useLocation()
    const isActive = location.pathname === to
        ? 'text-blue-500 bg-blue-50'
        : 'text-gray-600 hover:bg-gray-50'

    return (
        <Link
            to={to}
            className={`${isActive} px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out flex items-center space-x-1`}
        >

            <span>{children}</span>
        </Link>
    )
}

export default NavLink;