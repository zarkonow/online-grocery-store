"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      router.push("/");
    }
  });

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.SignIn(email, password).then(
      (resp) => {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("success", "Sing In Successfully");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        console.log(e);
        toast(e.response.data.error.message);
        setLoader(false);
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
        <h2 className="text-4xl font-bold text-center">Sing In to Account</h2>
        <p className="text-gray-400">Enter Email and Password to Sing In</p>

        <div className="mt-10 w-full flex flex-col gap-5">
          <Input
            onChange={(e) => setEmail(e.currentTarget.value)}
            label="email"
            type="email"
            placeholder="email@.com"
            autoComplete="email"
          />
          <Input
            onChange={(e) => setPassword(e.currentTarget.value)}
            label="password"
            type="password"
            placeholder="Password"
          />

          <Button
            onClick={() => onSignIn()}
            disabled={email === "" || password === ""}
          >
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>

          <p>
            Don't have an account?
            <Link href={"/create-account"} className="text-blue-500">
              {" "}
              Click Here to create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingIn;
