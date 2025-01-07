import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", userCredential.user);
      navigate("/");
      setError(null); // Xatolikni tozalash
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Ошибка входа. Пожалуйста, проверьте ваш email и пароль.");
    }
  };

  return (
    <div className="container px-6">
      <div className="text-center max-w-80 bg-white rounded-xl p-4 mx-auto dark:bg-inherit border">
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            className="mb-4 p-1 lg:p-2 bg-inherit border border-gray-400 rounded dark:text-white"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="mb-4 p-1 lg:p-2 bg-inherit border border-gray-400 rounded dark:text-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 lg:py-2 lg:px-4 rounded"
            type="submit"
          >
            Войти
          </button>
        </form>
        <p className="mt-4 text-xs lg:text-sm dark:text-white">
          У вас нет аккаунта?
          <span onClick={() => navigate("/register")} className="text-blue-500 cursor-pointer ml-4">
             Зарегистраться
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
