"use client";

import LoginCard from "@/components/login/Login";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";




const Login = () => {

  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`/api/users/login`, formState);
      console.log("Response", response?.data);
      router.push(`/verifyemail?token=${response?.data?.token}`);
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center mx-auto md:mx-0">
        <LoginCard {...{ handleLogin, formState, setFormState }} />
    
    </div>
  );
};


export default Login;