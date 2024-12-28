"use client";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";

function Header(params) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log("getCategoryList", resp.data.data);
      setCategoryList(resp.data.data);
    });
  };

  return (
    <div className="flex shadow-lg justify-between bg-slate-100 items-center">
      
      <div className="flex justify-between items-center p-1 bg-slate-100">
      <Link href={"/"}>
        <Image src="/logo3.png" alt="logo" width={70} height={70} priority />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2
              className="md:flex m-5 items-center
             outline-none border rounded-full p-2 px-2
              bg-slate-200 cursor-pointer "
            >
              <LayoutGrid className="hidden  h-5 w-5 " />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border rounded-lg p-2">
            <DropdownMenuLabel className="text-pretty text-slate-400">
              Browse Category
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link key={index} href={'/products-category/'+category.name}>
                <DropdownMenuItem key={index} className="flex items-center gap-2">
                  
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      category.icon[0].url
                    }
                    unoptimized={true}
                    alt="icon"
                    width={25}
                    height={25}
                  />
                  <h2 className="text-lg">{category.name}</h2>
                  
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div
          className="md:flex items-center gap-2
         border rounded-full p-2  bg-slate-200 hidden justify-between"
        >
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>

      <div className="flex gap-1 items-center  bg-slate-100">
        <h2 className="hidden md:flex gap-1 items-center bg-slate-100">
          0<ShoppingBag />
        </h2>
        <div className="mr-3">
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
