import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
} from "../services/budgetService";
import { useExpense } from "../context/ExpenseContext";
import toast from "react-hot-toast";

const categories = [
  "Food",
  "Shopping",
  "Travel",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

export default function BudgetPage() {
  const { expenses, fetchExpenses } = useExpense();

  const [budgets, setBudgets] = useState([]);

  const [form, setForm] = useState({
    category: "Food",
    amount: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (err) {
      toast.error("Failed to load budgets");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budget = {
      ...form,
      amount: Number(form.amount),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };

    try {
      if (editingId) {
        await updateBudget(editingId, budget);
        toast.success("Budget Updated");
      } else {
        await addBudget(budget);
        toast.success("Budget Added");
      }

      setForm({
        category: "Food",
        amount: "",
      });

      setEditingId(null);

      await fetchBudgets();
      await fetchExpenses();
    } catch (err) {
      toast.error("Operation Failed");
    }
  };

  const handleEdit = (budget) => {
    setEditingId(budget.id);

    setForm({
      category: budget.category,
      amount: budget.amount,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget?")) return;

    try {
      await deleteBudget(id);

      toast.success("Budget Deleted");

      await fetchBudgets();
      await fetchExpenses();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold mb-2">
            💰 Monthly Budgets
          </h1>

          <p className="text-gray-500 mb-6">
            Set your monthly budget category wise.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-3 gap-4"
          >
            <select
              className="border rounded-lg p-3"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Budget Amount"
              className="border rounded-lg p-3"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value,
                })
              }
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 font-medium">
              {editingId ? "Update Budget" : "Add Budget"}
            </button>
          </form>

          <div className="mt-8 space-y-4">
            {budgets.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No budgets added yet.
              </div>
            ) : (
              budgets.map((budget) => {
                const filteredExpenses = expenses.filter(
                  (expense) =>
                    expense.category?.trim().toLowerCase() ===
                      budget.category?.trim().toLowerCase() &&
                    expense.type?.trim().toUpperCase() === "EXPENSE"
                );

                const spent = filteredExpenses.reduce(
                  (sum, expense) => sum + Number(expense.amount || 0),
                  0
                );

                const remaining = budget.amount - spent;

                const isOverBudget = spent > budget.amount;

                const progress =
                  budget.amount > 0
                    ? Math.min((spent / budget.amount) * 100, 100)
                    : 0;

                return (
                  <div
                    key={budget.id}
                    className="border rounded-xl p-5 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold">
                          {budget.category}
                        </h2>

                        <p className="text-gray-600 mt-2">
                          Budget :
                          <span className="font-semibold ml-2">
                            ₹{budget.amount}
                          </span>
                        </p>

                        <p className="text-blue-600 mt-1">
                          Spent :
                          <span className="font-semibold ml-2">
                            ₹{spent}
                          </span>
                        </p>

                        <p
                          className={`mt-1 font-semibold ${
                            isOverBudget
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {isOverBudget
                            ? `Over Budget : ₹${Math.abs(remaining)}`
                            : `Remaining : ₹${remaining}`}
                        </p>

                        <div className="mt-4">
                          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                isOverBudget
                                  ? "bg-red-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${progress}%`,
                              }}
                            />
                          </div>

                          <p className="text-sm text-gray-500 mt-2">
                            {progress.toFixed(0)}% Budget Used
                          </p>
                        </div>

                        <p className="text-sm text-gray-400 mt-3">
                          {budget.month}/{budget.year}
                        </p>
                      </div>

                      <div className="flex gap-3 ml-6">
                        <button
                          onClick={() => handleEdit(budget)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(budget.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}