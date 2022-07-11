import { createContext, useState } from "react";
// import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axios";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  //   const [user, setUser] = useState(
  //     localStorage.getItem("access_token")
  //       ? jwt_decode(localStorage.getItem("access_token"))
  //       : null
  //   );

  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const createUser = async (user) => {
    try {
      const response = await axios.post("/users", user);
      if (response.status === 201) {
        await loginUser(user);
      }
    } catch (e) {
      if (e.response.data.data) alert(e.response.data.data);
      else alert("Something went wrong.");
    }
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post("/login", user);
      if (response.status === 200) {
        setUser(response.data.data);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logoutUser = () => {
    setUser("");
    navigate("login");
  };

  const deleteAccount = async () => {
    await axios.delete(`users/${user.id}`);
    navigate("/register");
  };

  //   const logoutUser = () => {
  //     setUser(null);
  //     localStorage.removeItem("access_token");
  //     localStorage.removeItem("refresh_token");
  //     navigate("/login");
  //   };

  //   const deleteAccount = async () => {
  //     await axiosInstance.delete("/api/delete_account", {
  //       headers: {
  //         Authorization: localStorage.getItem("access_token")
  //           ? `JWT ${String(localStorage.getItem("access_token"))}`
  //           : null,
  //         "Content-Type": "application/json",
  //         accept: "application/json",
  //       },
  //     });
  //   };

  const contextData = {
    createUser,
    loginUser,
    user,
    setUser,
    logoutUser,
    deleteAccount,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {/* {loading ? null : children} */}
      {children}
    </AuthContext.Provider>
  );
}
