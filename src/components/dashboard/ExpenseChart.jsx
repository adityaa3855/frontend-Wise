import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#F97316",
];

function ExpenseChart({ expenses }) {

    const chartData = Object.values(

        expenses
            .filter(item => item.type.toUpperCase() === "EXPENSE")
            .reduce((acc, item) => {

                if (!acc[item.category]) {
                    acc[item.category] = {
                        name: item.category,
                        value: 0,
                    };
                }

                acc[item.category].value += item.amount;

                return acc;

            }, {})

    );

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h2 className="text-xl font-bold mb-5">
                Expense Distribution
            </h2>

            <div className="h-80">

                {chartData.length === 0 ? (

                    <div className="flex h-full items-center justify-center text-gray-500">
                        No Expense Data
                    </div>

                ) : (

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >

                                {chartData.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />

                                ))}

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                )}

            </div>

        </div>

    );

}

export default ExpenseChart;