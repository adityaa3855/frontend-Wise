function SummaryCard({
    title,
    amount,
    color,
    icon,
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        ₹ {amount}
                    </h2>

                </div>

                <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl ${color}`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default SummaryCard;