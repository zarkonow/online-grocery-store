"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      router.push("/");
    }
  });

  const onCreateAccount = async () => {
    GlobalApi.registerUsers(username, email, password).then(
      (resp) => {
        console.log(resp.data.user);
        console.log(resp.data.jwt);
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("success", "Account Created Successfully");
        router.push("/");
      },
      (e) => {
        toast(e.response.data.error.message);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-20 cursor-pointer">
      <div
        className="flex flex-col items-center justify-center p-10
      bg-slate-200 border border-slate-300 rounded-lg shadow-lg"
      >
        <Image src="/logo3.png" alt="logo" width={100} height={100} />
        <h2 className="text-4xl font-bold text-center">Create Account</h2>
        <p className="text-gray-400">
          Enter Email and Password to create an account
        </p>

        <div className="mt-10 w-full flex flex-col gap-5">
          <Input
            onChange={(e) => setUsername(e.currentTarget.value)}
            label="username"
            type="username"
            placeholder="Username"
          />
          <Input
            onChange={(e) => setEmail(e.currentTarget.value)}
            label="email"
            type="email"
            placeholder="email@.com"
          />
          <Input
            onChange={(e) => setPassword(e.currentTarget.value)}
            label="password"
            type="password"
            placeholder="Password"
          />
          <Button
            onClick={() => onCreateAccount()}
            disabled={username === "" || email === "" || password === ""}
          >
            {loader ?<LoaderIcon className="animate-spin text-2xl"/>: 'Create an Account'}
           
            
          </Button>
          <p>
            Already Have an Account:
            <Link href={"/sign-in"} className="text-blue-500">
              {" "}
              Click Here to Sign In
            </Link> 
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
