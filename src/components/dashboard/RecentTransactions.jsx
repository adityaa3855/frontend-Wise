function RecentTransactions({ expenses }) {

    const transactions = [...expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold">
                    Recent Transactions
                </h2>

            </div>

            {
                transactions.length === 0 ? (

                    <div className="text-center py-10 text-gray-500">
                        No Transactions Found
                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-3">Category</th>
                                    <th className="text-left py-3">Type</th>
                                    <th className="text-left py-3">Amount</th>
                                    <th className="text-left py-3">Date</th>

                                </tr>

                            </thead>

                            <tbody>

                                {transactions.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-slate-50"
                                    >

                                        <td className="py-4">
                                            {item.category}
                                        </td>

                                        <td>

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${
                                                    item.type.toUpperCase() === "INCOME"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {item.type}
                                            </span>

                                        </td>

                                        <td
                                            className={
                                                item.type.toUpperCase() === "INCOME"
                                                    ? "text-green-600 font-semibold"
                                                    : "text-red-600 font-semibold"
                                            }
                                        >
                                            ₹ {item.amount}
                                        </td>

                                        <td>
                                            {new Date(item.date).toLocaleDateString()}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )
            }

        </div>

    );

}

export default RecentTransactions;