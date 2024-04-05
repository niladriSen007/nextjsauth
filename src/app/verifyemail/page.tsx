/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {

    const router = useRouter();


    const searchParams = useSearchParams();
    const pathName = usePathname();

    // console.log(`${pathName} -- ${searchParams}`)
    const urlToken = searchParams.get("token");



    
    const [isDisabled, setIsDisabled] = useState(false);
    
    const verifyUserEmail = async () => {
        setIsDisabled(true);
        try {
            const response = await axios.post(`api/users/verifyemail`, {
                token: urlToken,
            });
            const data = await response.data;
            setIsDisabled(false);
            router.push(`/`);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Button disabled={isDisabled} onClick={verifyUserEmail} variant={"outline"}>
        Verify Email
      </Button>
    </div>
  );
};
export default VerifyEmail;
