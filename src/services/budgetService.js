import api from "../api/axios";

// Get all budgets
export const getBudgets = async () => {
    const response = await api.get("/budgets");
    return response.data;
};

// Add budget
export const addBudget = async (budget) => {
    const response = await api.post("/budgets", budget);
    return response.data;
};

// Update budget
export const updateBudget = async (id, budget) => {
    const response = await api.put(`/budgets/${id}`, budget);
    return response.data;
};

// Delete budget
export const deleteBudget = async (id) => {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
};