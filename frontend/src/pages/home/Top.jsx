import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import {  Button, Modal } from "flowbite-react";

const Top = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [exp, setExp] = useState();
  const [posts, setPosts] = useState();
  const [openModal, setOpenModal] = useState(false);

  const refreshToken = async () => {
    try {
      const token = await axios.get("http://localhost:3000/token");
      const decode = jwtDecode(token.data);

      setUsername(decode.username);
      setId(decode.id);
      setExp(decode.exp);
      setToken(token.data);
    } catch (error) {
      if (error) navigate("/login");
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

  const showPosts = async () => {
    const result = await axiosJWT.get(`http://localhost:3000/show`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(result);
    setPosts(result.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:3000/logout", {
      id,
    });
    navigate("/login");
  };

  useEffect(() => {
    const initialize = async () => {
      await refreshToken();
      if (id) {
        showPosts();
      }
    };
    initialize();
  }, [id]);

  return (
    <>
      <div className="bg-fixed bg-cover bg-no-repeat bg-center grid grid-cols-12 h-dvh py-5">
        <div className="col-start-5 col-span-4">
          <header className="flex justify-center">
            <nav className="bg-amber-500 p-2 rounded-full">
              <ul className="flex">
                <Link
                  to="/"
                  className="py-4 px-12 rounded-full font-semibold text-white text-md"
                >
                  add
                </Link>
                <Link
                  to="/top"
                  className="bg-amber-700 py-4 px-12 rounded-full font-semibold text-white text-md"
                >
                  top
                </Link>
              </ul>
            </nav>
          </header>
          <main className="py-10">
            <div className="flex justify-between">
              <p className="text-zinc-700 font-semibold text-md">
                welcome {username}👋
              </p>
              <button
                onClick={() => setOpenModal(true)}
                className="text-red-500 font-semibold text-md"
              >
                log out
              </button>
            </div>
            <div className="mt-5">
              {posts
                ? posts.map((post, index) => (
                    <div
                      key={index}
                      className="mt-5 bg-amber-500 rounded-lg text-white p-5"
                    >
                      <div className="flex items-center gap-x-2">
                        <img
                          className="w-11 h-11 rounded-full"
                          src="/unknown.jpeg"
                          alt=""
                        />
                        <p className="font-semibold text-md">
                          {post.author.username}
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className="text-md">{post.description}</p>
                        <p className="text-end italic text-md">{post.date}</p>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </main>
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Body className="bg-amber-500 rounded-lg">
          <div className="text-center">
            <h3 className="my-16 text-md font-normal text-white">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="logout" onClick={logout}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="cancelLogout" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Top;
