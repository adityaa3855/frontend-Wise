import { useMemo } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import { useExpense } from "../context/ExpenseContext";

import {
    FaArrowUp,
    FaArrowDown,
    FaWallet,
} from "react-icons/fa";

function Dashboard() {

    const { expenses, loading } = useExpense();

    const totalIncome = useMemo(() => {

        return expenses
            .filter(item => item.type.toUpperCase() === "INCOME")
            .reduce((sum, item) => sum + item.amount, 0);

    }, [expenses]);

    const totalExpense = useMemo(() => {

        return expenses
            .filter(item => item.type.toUpperCase() === "EXPENSE")
            .reduce((sum, item) => sum + item.amount, 0);

    }, [expenses]);

    const balance = totalIncome - totalExpense;

    if (loading) {
        return (
            <DashboardLayout>
                <div className="text-center py-10 text-slate-500 text-lg">
                    Loading Dashboard...
                </div>
            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <SummaryCard
                    title="Total Income"
                    amount={totalIncome}
                    color="bg-green-500"
                    icon={<FaArrowUp />}
                />

                <SummaryCard
                    title="Total Expense"
                    amount={totalExpense}
                    color="bg-red-500"
                    icon={<FaArrowDown />}
                />

                <SummaryCard
                    title="Current Balance"
                    amount={balance}
                    color="bg-blue-600"
                    icon={<FaWallet />}
                />

            </div>

            {/* Expense Chart */}
            <div className="mt-8">
                <ExpenseChart expenses={expenses} />
            </div>

            {/* Recent Transactions */}
            <div className="mt-8">
                <RecentTransactions expenses={expenses} />
            </div>

        </DashboardLayout>

    );

}

export default Dashboard;