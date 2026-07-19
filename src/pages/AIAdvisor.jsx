import { useState } from "react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAIAdvice } from "../services/aiService";

function AIAdvisor() {

    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {

        if (!prompt.trim()) {
            toast.error("Please enter your question.");
            return;
        }

        try {

            setLoading(true);

            const res = await getAIAdvice(prompt);

            setResponse(res.response);

        } catch (error) {

            console.error(error);

            toast.error("Unable to generate AI advice.");

        } finally {

            setLoading(false);

        }

    };

    const copyReport = async () => {

        await navigator.clipboard.writeText(response);

        toast.success("Report copied!");

    };

    const clearReport = () => {

        setPrompt("");
        setResponse("");

    };

    return (

        <DashboardLayout>

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="bg-white rounded-2xl shadow-md p-8">

                    <h1 className="text-3xl font-bold text-slate-800">
                        🤖 AI Financial Advisor
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Ask AI to analyze your expenses, savings, budget or spending habits.
                    </p>

                    <textarea
                        rows={5}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {

                            if (e.ctrlKey && e.key === "Enter") {

                                handleAnalyze();

                            }

                        }}
                        placeholder="Example: Analyze my monthly expenses and suggest where I can save money."
                        className="w-full mt-6 border border-slate-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-4 mt-5">

                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-3 rounded-xl font-semibold transition"
                        >
                            {loading ? "Analyzing..." : "Analyze Expenses"}
                        </button>

                        <button
                            onClick={clearReport}
                            className="bg-slate-200 hover:bg-slate-300 px-8 py-3 rounded-xl font-semibold"
                        >
                            Clear
                        </button>

                    </div>

                    <p className="text-xs text-slate-400 mt-3">
                        Tip: Press <b>Ctrl + Enter</b> to analyze quickly.
                    </p>

                </div>

                {/* Report */}

                {response && (

                    <div className="bg-white rounded-2xl shadow-md p-8 mt-8">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold text-slate-800">
                                📊 AI Financial Report
                            </h2>

                            <button
                                onClick={copyReport}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                            >
                                Copy Report
                            </button>

                        </div>

                        <div className="prose prose-slate max-w-none leading-8">

                            <ReactMarkdown>
                                {response}
                            </ReactMarkdown>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

}

export default AIAdvisor;