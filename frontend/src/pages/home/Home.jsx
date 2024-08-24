import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="grid grid-cols-12 h-dvh py-5">
        <div className="col-start-5 col-span-4">
          <header className="flex justify-center bg-amber-500 shadow-lg rounded-lg py-5">
            <Link to="/" className="relative group">
              <p className="absolute text-2xl scale-125 transition-all group-hover:scale-100 -rotate-12 -left-8 -top-2">
                😍
              </p>
              <h1 className="text-white font-bold text-2xl">Say it!</h1>
              <p className="absolute text-lg scale-100 transition-all group-hover:scale-150 rotate-12 -right-5 -bottom-3">
                💩
              </p>
            </Link>
          </header>
          <section className="text-center text-zinc-700  py-10">
            <h1 className="font-bold text-4xl">
              A place where you can express everything
            </h1>
            <p className="text-base px-10 mt-10">
              <b className="underline underline-offset-4 decoration-red-600">
                Check it out
              </b>
              ,{" "}
              <b className="underline underline-offset-4 decoration-red-600">
                get inspired
              </b>
              ,{" "}
              <b className="underline underline-offset-4 decoration-red-600">
                add your new story here!{" "}
              </b>
              and don&apos;t forget, I&apos;m here with you 🫂
            </p>
          </section>
          <main>
            <div className="flex justify-between">
              <p className="text-zinc-700 font-semibold text-base">
                welcome {username}👋
              </p>
              <button
                onClick={() => setOpenModal(true)}
                className="text-red-500 font-semibold text-base"
              >
                log out
              </button>
            </div>
            <form className="flex flex-col gap-y-5 mt-5" method="post">
              <Textarea
                color="default"
                className="p-5 resize-none placeholder-white text-white text-base font-medium"
                placeholder="say what you want to say here..."
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={9}
              />
              <Button
                onClick={submit}
                color="add"
                size="lg"
                className="w-full shadow-lg"
              >
                add
              </Button>
            </form>
            <div className="mt-5">
              <p className="text-zinc-700 font-semibold text-base">
                your post 📑
              </p>
              {posts
                ? posts.map((post, index) => (
                    <div
                      className="relative mt-5 flex items-center shadow-lg"
                      key={index}
                    >
                      <div className="w-full bg-amber-500 rounded-lg text-white p-5">
                        <p className="text-base">{post.description}</p>
                        <p className="mt-8 text-sm">
                          By {username} on {post.date}
                        </p>
                      </div>
                      <div className="absolute -right-20">
                        <form
                          className="flex flex-col items-center gap-y-1"
                          action=""
                        >
                          <button className="text-xl hover:scale-125 transition-all bg-gray-100 py-1 px-3 rounded-batext-base shadow-batext-base hover:shadow-gray-400 rotate-6">
                            😍
                          </button>
                          <p className="font-bold text-zinc-700">68</p>
                          <button className="text-xl hover:scale-125 transition-all bg-gray-100 py-1 px-3 rounded-batext-base shadow-batext-base hover:shadow-gray-400 -rotate-6">
                            💩
                          </button>
                        </form>
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
        size="batext-base"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Body className="bg-amber-500 rounded-lg">
          <div className="text-center">
            <h3 className="my-16 text-base font-normal text-white">
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
