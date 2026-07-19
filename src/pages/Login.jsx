import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import loginImage from "../assets/images/image1.jpg";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      login(response.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 grid lg:grid-cols-5 overflow-hidden">

      {/* LEFT SIDE */}

      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:col-span-3 relative overflow-hidden text-white px-16 py-12 flex-col justify-center"
      >

        {/* Background Image */}

        <img
          src={loginImage}
          alt="Expense Tracker"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/35"></div>

        {/* Logo */}

        <div className="flex items-center gap-4 z-10">

          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-lg">
            💰
          </div>

          <div>

            <h1 className="text-3xl font-extrabold">
              ExpenseAI
            </h1>

            <p className="text-blue-100">
              Smart Personal Finance
            </p>

          </div>

        </div>

        {/* Heading */}

        <div className="mt-16 z-10">

          <h2 className="text-6xl font-extrabold leading-tight">

            Control
            <br />
            Your Money
            <br />
            With AI

          </h2>

          <p className="mt-8 text-xl leading-9 max-w-xl text-white/90">

            Manage your income and expenses,
            monitor budgets,
            visualize reports,
            and receive AI-powered financial advice
            all in one place.

          </p>

                  </div>

        {/* Floating Card 1 */}

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="absolute top-32 right-10 z-10 bg-white/20 backdrop-blur-xl rounded-3xl p-6 w-72 shadow-2xl border border-white/20"
        >

          <p className="text-white/80 text-sm">
            Monthly Savings
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ₹12,450
          </h2>

          <p className="mt-2 text-green-300 font-medium">
            ↑ 18% from last month
          </p>

        </motion.div>

        {/* Floating Card 2 */}

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="absolute bottom-24 right-20 z-10 bg-white/20 backdrop-blur-xl rounded-3xl p-6 w-80 shadow-2xl border border-white/20"
        >

          <p className="text-lg font-semibold">
            🤖 AI Suggestion
          </p>

          <p className="mt-3 text-white/90 leading-7">

            Reduce your food spending by
            8% this month and save nearly
            ₹3,000 without changing your
            lifestyle.

          </p>

        </motion.div>

      </motion.div>

      {/* RIGHT SIDE */}

      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: .8 }}
        className="lg:col-span-2 flex justify-center items-center p-8"
      >

        <div className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl border border-slate-200 p-10">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-slate-900">
              Welcome Back 👋
            </h2>

            <p className="text-slate-500 mt-3">
              Sign in to continue managing your finances.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-6"
          >

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-4 transition-all duration-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">

                <MdEmail className="text-slate-400 text-xl" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-3 w-full outline-none bg-transparent"
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-4 transition-all duration-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">

                <RiLockPasswordLine className="text-slate-400 text-xl" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ml-3 w-full outline-none bg-transparent"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-blue-600 transition"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

                        {/* Remember Me */}

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2 text-slate-600">

                <input
                  type="checkbox"
                  className="accent-blue-600"
                />

                Remember me

              </label>

              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

            {/* Divider */}

            <div className="flex items-center gap-4">

              <div className="flex-1 h-px bg-slate-200"></div>

              <span className="text-slate-400 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-slate-200"></div>

            </div>

            {/* Register */}

            <p className="text-center text-slate-600">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                Create Account
              </Link>

            </p>

          </form>

        </div>

      </motion.div>

    </div>
  );
}

export default Login;