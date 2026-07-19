import { motion } from "framer-motion";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
      });

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">

      {/* LEFT */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white p-16"
      >
        <h1 className="text-5xl font-bold">
          Join ExpenseWise
        </h1>

        <p className="mt-6 text-xl text-blue-100">
          Track your money.
          <br />
          Control your spending.
          <br />
          Let AI guide your finances.
        </p>

        <div className="mt-16 space-y-5">

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 w-80">
            <p>📈 Smart Analytics</p>
            <h2 className="text-2xl font-bold mt-2">
              AI Insights
            </h2>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 w-72 ml-16">
            <p>💰 Expense Tracking</p>
            <h2 className="text-2xl font-bold mt-2">
              Real-Time
            </h2>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 w-64">
            <p>🤖 AI Advisor</p>
            <h2 className="text-2xl font-bold mt-2">
              Coming Soon
            </h2>
          </div>

        </div>

      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-4xl font-bold text-slate-900">
            Create Account
          </h2>

          <p className="text-slate-500 mt-2">
            Start managing your expenses today.
          </p>

          <form
            onSubmit={handleRegister}
            className="mt-8 space-y-6"
          >

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">
                <MdPerson className="text-slate-400 text-xl" />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full ml-3 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">
                <MdEmail className="text-slate-400 text-xl" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full ml-3 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">
                <RiLockPasswordLine className="text-slate-400 text-xl" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full ml-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <p className="text-center text-slate-500">

              Already have an account?

              <Link
                to="/login"
                className="text-blue-600 ml-2 font-semibold hover:underline"
              >
                Login
              </Link>

            </p>

          </form>

        </div>
      </motion.div>

    </div>
  );
}

export default Register;