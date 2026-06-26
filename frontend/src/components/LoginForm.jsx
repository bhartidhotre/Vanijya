import axios from "axios";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function LoginForm({ setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prn: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");




  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("https://vanijya.onrender.com/api/auth/login", formData);

      // save token
      localStorage.setItem("token", res.data.token);

      // save user info
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user); // update App state

      setSuccess("Login Successful!");
      navigate("/"); 
    } catch (err) {
  console.error(err); // log the full error
  if (err.response) {
    // Server responded with a status code outside 2xx
    setError(err.response.data.error || "Login Failed");
  } else if (err.request) {
    // Request was made but no response received
    setError("No response from server");
  } else {
    // Something else went wrong
    setError(err.message);
  }
}

  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Login in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
          {success && <p className="text-green-600 text-sm font-bold">{success}</p>}

          <div>
            <label htmlFor="prn" className="block text-sm/6 font-medium text-gray-900">
              PRN Number
            </label>
            <div className="mt-2">
              <input
                id="prn"
                name="prn"
                type="text"
                required
                value={formData.prn}
                onChange={handleChange}
                autoComplete="off"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
