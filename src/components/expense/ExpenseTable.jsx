import { FaEdit, FaTrash } from "react-icons/fa";
import { useExpense } from "../../context/ExpenseContext";
import toast from "react-hot-toast";

function ExpenseTable({
    expenses,
    setOpen,
    setSelectedExpense,
}) {

    const { deleteExpense } = useExpense();

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {

            await deleteExpense(id);

            toast.success("Expense Deleted");

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete expense");

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Type</th>
                        <th className="text-left p-4">Amount</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-center p-4">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {expenses.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center p-8 text-slate-500"
                            >
                                No Expenses Found
                            </td>

                        </tr>

                    ) : (

                        expenses.map((expense) => (

                            <tr
                                key={expense.id}
                                className="border-t hover:bg-slate-50"
                            >

                                <td className="p-4">
                                    {expense.category}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            expense.type.toUpperCase() === "INCOME"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {expense.type}
                                    </span>

                                </td>

                                <td
                                    className={`p-4 font-semibold ${
                                        expense.type.toUpperCase() === "INCOME"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    ₹ {expense.amount}
                                </td>

                                <td className="p-4">
                                    {new Date(expense.date).toLocaleDateString()}
                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-4">

                                        <button
    onClick={() => {
        setSelectedExpense(expense);
        setOpen(true);
    }}
    className="text-blue-600 hover:text-blue-800"
    title="Edit"
>
    <FaEdit />
</button>

                                        <button
                                            onClick={() => handleDelete(expense.id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default ExpenseTable;