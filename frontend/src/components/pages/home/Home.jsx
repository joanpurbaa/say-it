import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [exp, setExp] = useState("");

  const refreshToken = async () => {
    try {
      const token = await axios.get("http://localhost:3000/token");
      const decode = jwtDecode(token.data);
      setUsername(decode.username);
      setId(decode.id);
      setExp(decode.exp);
      setToken(token.data);
    } catch (error) {
      if (error.token) navigate("/login");
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      if (exp * 1000 < new Date().getTime()) {
        const token = await axios.get("http://localhost:3000/token");
        const decode = jwtDecode(token.data);

        setUsername(decode.username);
        setId(decode.id);
        setExp(decode.exp);
        setToken(token.data);

        config.headers.Authorization = `Bearer ${token.data}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const showPost = async () => {
    const result = await axiosJWT.get("http://localhost:3000/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(result.data[0]);
  };

  const logout = async () => {
    await axios.post("http://localhost:3000/logout", {
      id,
    });
    navigate("/login");
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <h1 className="text-red-500">welcome {username}</h1>
      <button onClick={logout}>logout</button>
      <button onClick={showPost}>get posts</button>
    </>
  );
};

export default Home;
