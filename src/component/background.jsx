import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
// import { Carousel } from "./carousel";
import admin from "../assets/administrator.svg";

export function Background() {
  return (
    <div className="max-w-screen-2xl mx-auto h-svh flex">
      <div className="w-full md:w-2/5 h-full flex flex-col overflow-y-auto">
        <Header />
        <div className="p-2 flex-1 flex justify-center items-center">
          <Outlet />
        </div>
        <Footer />
      </div>
      <div
        className="w-3/5 h-full hidden bg-cover bg-center p-4 md:flex items-end bg-adminPrimary"
        style={{
          backgroundImage: `url(${admin})`,
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <div className="w-full py-4">
          <Carousel />
        </div> */}
      </div>
    </div>
  );
}
