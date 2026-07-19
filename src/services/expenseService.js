import api from "../api/axios";

// Get All Expenses
export const getExpenses = async () => {
    try {
        const response = await api.get("/expenses");
        return response.data;
    } catch (error) {
        console.error("Get Expenses Error:", error);
        throw error;
    }
};

// Add Expense
export const addExpense = async (expense) => {
    try {
        const response = await api.post("/expenses", expense);
        return response.data;
    } catch (error) {
        console.error("Add Expense Error:", error);
        throw error;
    }
};

// Update Expense
export const updateExpense = async (id, expense) => {
    try {
        const response = await api.put(`/expenses/${id}`, expense);
        return response.data;
    } catch (error) {
        console.error("Update Expense Error:", error);
        throw error;
    }
};

// Delete Expense
export const deleteExpense = async (id) => {
    try {
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete Expense Error:", error);
        throw error;
    }
};

// Get Expense By Id
export const getExpenseById = async (id) => {
    try {
        const response = await api.get(`/expenses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get Expense By Id Error:", error);
        throw error;
    }
};