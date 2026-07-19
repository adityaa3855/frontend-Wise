function Navbar() {
    return (

        <div className="bg-white shadow px-8 py-5 flex justify-between items-center">

            <div>

                <h1 className="text-2xl font-bold">
                    Dashboard
                </h1>

                <p className="text-slate-500">
                    Welcome back 👋
                </p>

            </div>

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                A
            </div>

        </div>

    );
}

export default Navbar;