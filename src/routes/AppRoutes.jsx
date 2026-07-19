import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import BudgetPage from "../pages/BudgetPage";
import AIAdvisor from "../pages/AIAdvisor";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/expenses"
                element={
                    <ProtectedRoute>
                        <Expenses />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/budgets"
                element={
                    <ProtectedRoute>
                        <BudgetPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/ai-advisor"
                element={
                    <ProtectedRoute>
                        <AIAdvisor />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default AppRoutes;