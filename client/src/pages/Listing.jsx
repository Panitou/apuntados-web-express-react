import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { IconCertificate } from "@tabler/icons-react";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="p-10 flex justify-center min-h-screen bg-[#09090B] items-center">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="h-[550px] w-[500px]">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] w-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )} */}
        </div>
      )}
      {listing && !loading && !error && (
        <div className="flex flex-col max-w-4xl p-3 my-7 gap-4 mx-7">
          <p className="text-4xl font-semibold text-white">{listing.name}</p>
          <p className="flex items-center mt-2 gap-2 text-white text-sm">
            <IconCertificate stroke={2} color="white" />
            {listing.course}
          </p>
          <p className="text-white h-8 w-full bg-white rounded-lg flex flex-col items-center justify-center">
            <span className="font-semibold text-[#09090B]">Description: </span>
          </p>
          <p className="text-white">{listing.description}</p>
          <ul className="text-[#09090B] font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mt-2">
            <li className="flex items-center gap-1 whitespace-nowrap bg-[#E691B5] w-16 h-8 rounded-lg justify-center">
              <span>Ciclo</span>
              {listing.semester}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap bg-[#E691B5] w-24 h-8 rounded-lg justify-center">
              <span>Precio</span>
              {listing.price}
            </li>
          </ul>
          <button
            onClick={() => setContact(true)}
            className="bg-[#FEC53B] text-[#09090B] font-bold rounded-lg uppercase hover:opacity-95 p-3"
          >
            Contactar
          </button>
        </div>
      )}
    </main>
  );
}
