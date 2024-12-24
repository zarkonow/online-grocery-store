import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  return (
    <div className="flex shadow-lg justify-between bg-slate-100 items-center">
      <div className="flex justify-between items-center p-1 bg-slate-100">
        <Image src="/logo.png" alt="logo" width={70} height={70} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="flex m-5 items-center
             outline-none border rounded-full p-2 px-2
              bg-slate-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5" />Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div
          className="md:flex items-center gap-2
         border rounded-full p-2  bg-slate-200 hidden justify-between"
        >
          <Search/>
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>

      <div className="flex gap-3 items-center  bg-slate-100">
        <h2 className="hidden md:flex gap-1 items-center bg-slate-100">
          0<ShoppingBag />
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
}

export default Header;
