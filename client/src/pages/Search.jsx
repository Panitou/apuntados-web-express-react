import React from "react";

function Search() {
  return (
    <div className="flex flex-col md:flex-row font-semibold">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search term:</label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Buscar..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Ciclo:</label>
            <div className="flex gap-2">
              <select id="semester" className="w-5">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label>Orden:</label>
            <div className="flex gap-2">
              <select id="price" className="border rounded-lg p-3">
                <option>Price high to low</option>
                <option>Price low to hight</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Aplicar filtros
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">
          Listing results:
        </h1>
      </div>
    </div>
  );
}

export default Search;
