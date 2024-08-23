import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Textarea, Button, Modal } from "flowbite-react";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [exp, setExp] = useState();
  const [posts, setPosts] = useState();
  const [description, setDescription] = useState();
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

  const showPostByUserId = async () => {
    const result = await axiosJWT.get(`http://localhost:3000/showbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPosts(result.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:3000/logout", {
      id,
    });
    navigate("/login");
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/post", {
        authorId: id,
        description,
      });

      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await refreshToken();
      if (id) {
        showPostByUserId();
      }
    };
    initialize();
  }, [id]);

  return (
    <>
      <div className="homeBackground bg-fixed bg-cover bg-no-repeat bg-center grid grid-cols-12 py-5">
        <div className="col-start-5 col-span-4">
          <header className="flex justify-center">
            <nav className="bg-amber-500 p-2 rounded-full">
              <ul className="flex">
                <li className="bg-amber-700 py-4 px-12 rounded-full">
                  <a className="font-semibold text-white text-lg" href="">
                    add
                  </a>
                </li>
                <li className="py-4 px-12 rounded-full">
                  <a className="font-semibold text-white text-lg" href="">
                    top
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <main className="py-10">
            <div className="flex justify-between">
              <p className="text-zinc-700 font-semibold text-lg">
                welcome {username}👋
              </p>
              <button
                onClick={() => setOpenModal(true)}
                className="text-red-500 font-semibold text-lg"
              >
                log out
              </button>
            </div>
            <form className="flex flex-col gap-y-5 mt-5" method="post">
              <Textarea
                color="default"
                className="p-5 resize-none placeholder-white text-white text-lg font-medium"
                placeholder="say what you want to say here..."
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={9}
              />
              <Button onClick={submit} color="add" size="lg" className="w-full">
                add
              </Button>
            </form>
            <div className="mt-5">
              <p className="text-zinc-700 font-semibold text-lg">
                your post 📑
              </p>
              {posts
                ? posts.map((post, index) => (
                    <div
                      key={index}
                      className="mt-5 bg-amber-500 rounded-lg text-white p-5"
                    >
                      <p className="text-lg">{post.description}</p>
                      <p className="text-end italic text-lg">{post.date}</p>
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
            <h3 className="my-16 text-lg font-normal text-white">
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

export default Home;
