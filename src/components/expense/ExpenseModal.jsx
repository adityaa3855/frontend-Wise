import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { useExpense } from "../../context/ExpenseContext";

function ExpenseModal({
    open,
    setOpen,
    selectedExpense,
    setSelectedExpense,
}) {

    const {
        addExpense,
        updateExpense,
    } = useExpense();

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("EXPENSE");
    const [date, setDate] = useState("");

    useEffect(() => {

        if (selectedExpense) {

            setAmount(selectedExpense.amount);
            setCategory(selectedExpense.category);
            setType(selectedExpense.type);
            setDate(selectedExpense.date);

        } else {

            setAmount("");
            setCategory("");
            setType("EXPENSE");
            setDate("");

        }

    }, [selectedExpense, open]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const expenseData = {
                title: category,
                amount,
                category,
                type,
                date,
                description: "",
            };

            if (selectedExpense) {

                await updateExpense(
                    selectedExpense.id,
                    expenseData
                );

                toast.success("Expense Updated");

            } else {

                await addExpense(expenseData);

                toast.success("Expense Added");

            }

            setOpen(false);
            setSelectedExpense(null);

            setAmount("");
            setCategory("");
            setType("EXPENSE");
            setDate("");

        } catch (error) {

            console.error(error);

            toast.error("Operation Failed");

        }

    };

    const handleClose = () => {

        setOpen(false);
        setSelectedExpense(null);

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-md p-8">

                <h2 className="text-2xl font-bold mb-6">

                    {selectedExpense
                        ? "Edit Expense"
                        : "Add Expense"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border rounded-xl p-3"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-xl p-3"
                        required
                    />

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border rounded-xl p-3"
                    >
                        <option value="EXPENSE">Expense</option>
                        <option value="INCOME">Income</option>
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border rounded-xl p-3"
                        required
                    />

                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-5 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
                        >
                            {selectedExpense ? "Update" : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ExpenseModal;