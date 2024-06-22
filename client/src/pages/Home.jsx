import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Consigue los mejores{" "}
          <span className="text-slate-500">apuntes universitarios</span>
          <br />
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Compra apuntes de diferentes personas y universidades, y vende y gana
          una comisión por cada venta.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Ver apuntes
        </Link>
      </div>
      {/* swiper */}
      {/* listing results */}
    </div>
  );
}

export default Home;
