import { Link, useLocation } from "react-router-dom";
import {
    FaChartPie,
    FaWallet,
    FaRobot,
    FaPiggyBank,
    FaSignOutAlt
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const location = useLocation();

    const { logout } = useAuth();

    const menus = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaChartPie />
        },

        {
            name: "Expenses",
            path: "/expenses",
            icon: <FaWallet />
        },

        {
            name: "Budgets",
            path: "/budgets",
            icon: <FaPiggyBank />
        },

        {
            name: "AI Advisor",
            path: "/ai-advisor",
            icon: <FaRobot />
        }
    ];

    return (

        <div className="w-64 bg-white shadow-lg flex flex-col">

            <div className="text-2xl font-bold text-blue-600 p-6 border-b">
                ExpenseWise AI
            </div>

            <nav className="flex-1 p-4">

                {menus.map((item) => (

                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-xl mb-2 transition ${
                            location.pathname === item.path
                                ? "bg-blue-600 text-white"
                                : "hover:bg-slate-100"
                        }`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>

                ))}

            </nav>

            <button
                onClick={logout}
                className="m-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
            >
                <FaSignOutAlt />
                Logout
            </button>

        </div>

    );

}

export default Sidebar;