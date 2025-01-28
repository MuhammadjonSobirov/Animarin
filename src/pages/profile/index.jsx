import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import app from "../../firebaseConfig"; // Firebase config file
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth(app);
  const [userTab, setUserTab] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setNewName(user.displayName || "");
        setNewEmail(user.email || "");
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/");
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(currentUser, {
        displayName: newName,
      });
      
      setCurrentUser({
        ...currentUser,
        displayName: newName,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(currentUser, newEmail);
      console.log("Email updated successfully!");
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(currentUser, newPassword);
      console.log("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const renderContent = () => {
    switch (userTab) {
      case 0:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Профиль
            </h2>
            {currentUser ? (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Имя
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="block text-center mx-auto my-2 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                <p className="text-gray-600 my-4 dark:text-gray-300">Email: {currentUser.email}</p>
                <button
                  onClick={handleUpdateProfile}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                  Сохранить изменения
                </button>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">Вы не авторизованы.</p>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Управление аккаунтом
            </h2>
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Изменить Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="block w-full my-4 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={handleUpdateEmail}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                  Обновить Email
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Изменить Пароль
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full my-4 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={handleUpdatePassword}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                  Обновить Пароль
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-red-500">
              Выход из аккаунта
            </h2>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen mb-10 p-4 rounded-xl dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-900 mb-16 dark:text-white">
        Ваш аккаунт
      </h1>
      <div className="mt-4 flex flex-col md:flex-row">
        <ul className="text-start w-full md:w-1/4 mb-4 md:mb-0">
          <li
            onClick={() => setUserTab(0)}
            className={`cursor-pointer text-xl mb-5 ${userTab === 0 ? "text-indigo-500 font-semibold" : "text-gray-900 dark:text-white"
              }`}
          >
            Профиль
          </li>
          <li
            onClick={() => setUserTab(1)}
            className={`cursor-pointer text-xl mb-5 ${userTab === 1 ? "text-indigo-500 font-semibold" : "text-gray-900 dark:text-white"
              }`}
          >
            Управление аккаунтом
          </li>
          <li
            onClick={() => setUserTab(2)}
            className={`cursor-pointer text-xl ${userTab === 2 ? "text-red-500 font-semibold" : "text-gray-900 dark:text-red-500"
              }`}
          >
            Выйти из аккаунта
          </li>
        </ul>
        <div className="hidden md:block w-0.5 bg-gray-300 dark:bg-gray-700"></div>
        <div className="flex-1 px-0 md:px-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
