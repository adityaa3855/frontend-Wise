import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import ExpenseTable from "../components/expense/ExpenseTable";
import ExpenseModal from "../components/expense/ExpenseModal";

import { useExpense } from "../context/ExpenseContext";

function Expenses() {

    const {
        expenses,
        loading,
    } = useExpense();

    const [open, setOpen] = useState(false);
const [selectedExpense, setSelectedExpense] = useState(null);

    return (

        <DashboardLayout>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Expenses
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
                >
                    + Add Expense
                </button>

            </div>

            {/* Expense Table */}
            {loading ? (

                <div className="text-center py-10 text-slate-500 text-lg">
                    Loading Expenses...
                </div>

            ) : (

               <ExpenseTable
    expenses={expenses}
    setOpen={setOpen}
    setSelectedExpense={setSelectedExpense}
/>

            )}

            {/* Expense Modal */}
           <ExpenseModal
    open={open}
    setOpen={setOpen}
    selectedExpense={selectedExpense}
    setSelectedExpense={setSelectedExpense}
/>

        </DashboardLayout>

    );

}

export default Expenses;