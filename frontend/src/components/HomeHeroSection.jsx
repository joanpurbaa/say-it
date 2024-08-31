import { Link } from "react-router-dom";

const HomeHeroSection = () => {
  return (
    <>
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
              A place where you can express everything!
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
    </>
  )
}

export default HomeHeroSection;