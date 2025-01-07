import  { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered user:", userCredential.user);
      setSuccess("Вы успешно зарегистрировались!");
      navigate("/");
      setError(null);
    } catch (err) {
      console.error("Registration error:", err.message);
      setError("Ошибка регистрации. Пожалуйста, попробуйте еще раз.");
      setSuccess(null);
    }
  };

  return (
    <div className="container px-6">
      <div className="text-center max-w-80 bg-white rounded-xl p-4 mx-auto dark:bg-inherit border">
        <form className="flex flex-col" onSubmit={handleRegister}>
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
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 lg:py-2 lg:px-4 rounded"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="mt-4 text-xs lg:text-sm dark:text-white">
          У вас уже есть аккаунт?
          <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer ml-4">
             Войти
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
