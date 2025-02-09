import LandingPage from "../components/home/LandingPage";
import Products from "../components/home/Products";

export default function Home() {
  return (
    <section className="">
    {/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"> */}
      <div className="">
      {/* <div className="inline-block max-w-xl text-center justify-center"> */}
        <LandingPage />
        <Products/>
      </div>
    </section>
  );
}
