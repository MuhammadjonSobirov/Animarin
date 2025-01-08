import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); // Email holati
  const [password, setPassword] = useState(""); // Parol holati
  const [error, setError] = useState(null); // Xatoliklarni boshqarish
  const [isLoading, setIsLoading] = useState(false); // Yuklash indikator
  const auth = getAuth(app); // Firebase auth
  const navigate = useNavigate(); // Router yo‘naltiruvchi

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Yuklashni boshlash
    setError(null); // Xatolikni tozalash

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", userCredential.user);
      navigate("/"); // Bosh sahifaga yo‘naltirish
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Ошибка входа. Проверьте ваш email и пароль."); // Xatolik xabari
    } finally {
      setIsLoading(false); // Yuklashni tugatish
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-screen px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 dark:text-white">
          Вход в аккаунт
        </h2>
        <form onSubmit={handleLogin} className="mt-6 space-y-6">
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-start text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full p-2 text-sm border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password input */}
          <div>
            <label
              htmlFor="password"
              className="block text-start text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full p-2 text-sm border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 text-sm font-medium text-white rounded-md ${
                isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </button>
          </div>
        </form>
        {/* Register redirect */}
        <p className="mt-4 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          У вас нет аккаунта?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 ml-2 hover:text-blue-600 cursor-pointer"
          >
            Зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
