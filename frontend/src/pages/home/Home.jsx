import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Textarea, Button, Modal } from "flowbite-react";
import HomeHeroSection from "../../components/HomeHeroSection";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [exp, setExp] = useState();
  const [posts, setPosts] = useState();
  const [postId, setPostId] = useState();
  const [showTotalLikes, setTotalLikes] = useState();
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

    result.data[0] == undefined ? setPosts(undefined) : setPosts(result.data);
    result.data.forEach((data) => setPostId(data.id));
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

  const showLikesById = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3000/showlikesbyid/${postId}`
      );

      result.data[0] == undefined
        ? setTotalLikes(0)
        : setTotalLikes(result.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const like = async () => {
    try {
      await axios.post("http://localhost:3000/like", {
        userId: id,
        postId: postId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await refreshToken();
      if (id) {
        showPostByUserId();
        showLikesById();
      }
    };
    initialize();
  }, [id, postId]);

  return (
    <>
      <div className="grid grid-cols-12 h-dvh">
        <div className="col-start-5 col-span-4 py-5">
        <HomeHeroSection/>
        <section className="mt-10 pb-10">
            <nav>
              <ul className="flex">
                <li className="w-full text-center border-b-2 border-zinc-700 py-2">
                  <Link to="/" className="text-zinc-700 font-semibold">
                    add
                  </Link>
                </li>
                <li className="w-full text-center border-b-2 py-2">
                  <Link to="/top" className="text-gray-300 font-semibold">
                    top
                  </Link>
                </li>
              </ul>
            </nav>
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
            <form
              className="flex flex-col items-start gap-y-5 mt-5"
              method="post"
            >
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
                className="w-auto shadow-lg"
              >
                add
              </Button>
            </form>
            <div className="mt-5">
              <p className="text-zinc-700 font-semibold text-base">
                your post 📑
              </p>
              {posts == undefined ? (
                <img className="w-96 mx-auto" src="/notFound.png" alt="" />
              ) : (
                posts.map((post, index) => (
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
                        method="post"
                        onSubmit={(e) => {
                          e.preventDefault();
                          like();
                          location.reload();
                        }}
                      >
                        <button
                          type="submit"
                          className="text-xl hover:scale-125 transition-all bg-gray-100 py-1 px-3 rounded-batext-base shadow-batext-base hover:shadow-gray-400 rotate-6 rounded-md"
                        >
                          😍
                        </button>
                      </form>
                      <p className="font-bold text-zinc-700">
                        {showTotalLikes}
                      </p>
                      <form action="">
                        <button className="text-xl hover:scale-125 transition-all bg-gray-100 py-1 px-3 rounded-batext-base shadow-batext-base hover:shadow-gray-400 -rotate-6 rounded-md">
                          💩
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
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
