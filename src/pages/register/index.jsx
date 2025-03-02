import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const generateRandomName = () => {
    return `User${Math.floor(1000 + Math.random() * 9000)}`; // User1234
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔄 Foydalanuvchiga avtomatik ism berish
      await updateProfile(user, {
        displayName: generateRandomName(),
      });

      console.log("Registered as:", user);
      navigate("/"); // Bosh sahifaga yo‘naltirish
    } catch (err) {
      console.error("Registration error:", err.message);
      setError("Ошибка регистрации. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 dark:text-white">
          Регистрация
        </h2>
        <form onSubmit={handleRegister} className="mt-6 space-y-6">
          {/* Email */}
          <div>
            <label className="block text-start text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-start text-sm font-medium text-gray-700 dark:text-gray-300">
              Пароль
            </label>
            <input
              type="password"
              className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 text-sm font-medium text-white rounded-md ${
              isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </button>
        </form>
        {/* Redirect to Login */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Уже есть аккаунт?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-500 hover:text-blue-600 cursor-pointer">
            Войти
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
