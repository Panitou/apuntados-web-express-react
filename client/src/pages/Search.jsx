import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem.jsx";

function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings);
  const [showMore, setShowMore] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    semester: "",
    sort: "created_at",
    order: "desc",
  });
  console.log(sidebardata);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
    if (e.target.id === "semester") {
      const semester = e.target.value.split("_")[0] || "I";

      setSidebardata({ ...sidebardata, semester });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("semester", sidebardata.semester);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const semesterFromUrl = urlParams.get("semester");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || semesterFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        semester: semesterFromUrl || "",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const onShowMoreClick = async () => {
    const numberOfListing = listings.length;
    const startIndex = numberOfListing;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row font-semibold w-full font-inter min-h-screen bg-[#09090B]">
      <div className="p-7 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap text-white">
              Buscar por término:
            </label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Buscar..."
              className=" rounded-lg p-3 w-52"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center rounded-lg">
            <label className="text-white">Ciclo:</label>
            <div className="flex gap-2">
              <select
                id="semester"
                className="w-15 h-10 text-center rounded-lg"
                onChange={handleChange}
                defaultValue={"I"}
              >
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
                <option value="X">X</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-white">Orden:</label>
            <div className="flex gap-2">
              <select
                id="sort_order"
                className="border rounded-lg p-3"
                onChange={handleChange}
                defaultValue={"created_at_desc"}
              >
                {/* <option value="regularPrice_desc">
                  Precio de mayor a menor
                </option>
                <option value="regularPrice_asc">
                  Precio de menor a mayor
                </option> */}
                <option value="createdAt_desc">Latest</option>
                <option value="regularPrice_desc">Oldest</option>
              </select>
            </div>
          </div>
          <button className="bg-[#FEC53B] text-[#09090B] font-bold p-3 rounded-lg uppercase hover:opacity-95">
            Aplicar filtros
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold text-white m-7">Resultados:</h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-white">No se encontraron apuntes</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Cargando
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Mostrar más
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
