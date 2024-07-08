import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userSlice, {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { IconLogin2 } from "@tabler/icons-react";
import OAuth from "../components/OAuth.jsx";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  console.log(formData);
  return (
    <div className="font-inter absolute inset-0 -z-10 h-full w-full flex items-center [background:#09090B]">
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-white text-center font-semibold mb-3">
          Iniciar Sesión
        </h1>
        <p className="text-[#A1A1AA] pb-3">
          Recuerda iniciar sesión con tu cuenta institucional
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <OAuth />
        </form>
      </div>
    </div>
  );
}

export default SignIn;
