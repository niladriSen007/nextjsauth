"use client";

import SignUp from "@/components/signup/SignUp";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupForm() {
  const router = useRouter();

  const [formState, setFormState] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await axios.post(`/api/users/signup`, formState);
      console.log("Response", response);
      router.push("/login");
    } catch (error) {
      console.log("Error signing up", error);
    }
  };

  useEffect(() => {
    if (formState.email.length > 0 && formState.password.length > 0 && formState.user_name.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formState]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <SignUp {...{ handleSignup,formState,setFormState }} />
    </div>
  );
}
