import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de importar Link desde react-router-dom
import { MdLocationOn } from "react-icons/md";

function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="font-bold text-lg">Precio: {listing.price}</p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-sx">Ciclo: {listing.semester}</div>
            <div className="font-bold text-sx">Curso: {listing.course}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
