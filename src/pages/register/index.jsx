import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState(""); // Email holati
  const [password, setPassword] = useState(""); // Parol holati
  const [error, setError] = useState(null); // Xatolik holati
  const [success, setSuccess] = useState(null); // Muvaffaqiyat holati
  const [isLoading, setIsLoading] = useState(false); // Yuklanish indikator
  const auth = getAuth(app); // Firebase auth
  const navigate = useNavigate(); // Router yo‘naltiruvchi

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Yuklanishni boshlash
    setError(null); // Xatolikni tozalash
    setSuccess(null); // Muvaffaqiyatni tozalash

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered user:", userCredential.user);
      setSuccess("Вы успешно зарегистрировались!");
      navigate("/"); // Bosh sahifaga yo‘naltirish
    } catch (err) {
      console.error("Registration error:", err.message);
      setError("Ошибка регистрации. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsLoading(false); // Yuklanishni tugatish
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Регистрация аккаунта
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-start text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-start text-sm font-medium text-gray-700 dark:text-gray-300">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Error/Success Messages */}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 font-bold text-white rounded-md ${
                isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              disabled={isLoading}
            >
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </div>
        </form>
        {/* Login Redirect */}
        <p className="mt-4 text-center text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          У вас уже есть аккаунт?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 ml-2 hover:text-blue-600 cursor-pointer"
          >
            Войти
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
