import api from "../api/axios";

export const getAIAdvice = async (prompt) => {

    const response = await api.post("/ai/advisor", {
        prompt,
    });

    return response.data;
};