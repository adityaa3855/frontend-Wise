import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getExpenses,
    addExpense as addExpenseApi,
    updateExpense as updateExpenseApi,
    deleteExpense as deleteExpenseApi,
} from "../services/expenseService";

import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {

    const { isAuthenticated } = useAuth();

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            setExpenses([]);
            setLoading(false);
            return;
        }

        try {

            setLoading(true);

            const data = await getExpenses();

            setExpenses(data);

        } catch (error) {

            console.error(error);

            if (error.response?.status !== 401) {
                toast.error("Failed to load expenses");
            }

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (isAuthenticated) {

            fetchExpenses();

        } else {

            setExpenses([]);
            setLoading(false);

        }

    }, [isAuthenticated]);

    const addExpense = async (expense) => {

        await addExpenseApi(expense);
        await fetchExpenses();

    };

    const updateExpense = async (id, expense) => {

        await updateExpenseApi(id, expense);
        await fetchExpenses();

    };

    const deleteExpense = async (id) => {

        await deleteExpenseApi(id);
        await fetchExpenses();

    };

    return (

        <ExpenseContext.Provider
            value={{
                expenses,
                loading,
                fetchExpenses,
                addExpense,
                updateExpense,
                deleteExpense,
            }}
        >
            {children}
        </ExpenseContext.Provider>

    );

}

export function useExpense() {

    return useContext(ExpenseContext);

}