"use client";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItemList from "./CartItemList";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const jwt = sessionStorage.getItem("jwt");
  const isLogin = sessionStorage.getItem("jwt") ? true : false;
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      // console.log("getCategoryList", resp.data.data);
      setCategoryList(resp.data.data);
    });
  };

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    console.log(cartItemList_);
    setTotalCartItem(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  return (
    <div className="flex shadow-lg justify-between bg-slate-100 items-center cursor-pointer">
      <div className="flex justify-between items-center p-1 bg-slate-100 ">
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
              <Link key={index} href={"/products-category/" + category.name}>
                <DropdownMenuItem
                  key={index}
                  className="flex items-center gap-2"
                >
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
                  <h2 className="text-lg cursor-pointer">{category.name}</h2>
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
        
        

        <Sheet>
  <SheetTrigger>
    <h2 className="hidden md:flex gap-1 items-center bg-slate-100">
          <ShoppingBasket className="h-7 w-7" />
          <span className="bg-primary text-white p-1 rounded-full">
            {totalCartItem}
          </span>
        </h2>
        </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className='bg-primary text-white font-bold text-lg p-2'>My Cart</SheetTitle>
      <SheetDescription asChild>
        <CartItemList cartItemList={cartItemList}/>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>






          {!isLogin ? (
            <Link href={"/sign-in"}>
              <Button>Login</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUserRound className="bg-green-100 text-primary h-12 w-12 p-2 rounded-full cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Orders</DropdownMenuItem>

                <DropdownMenuItem onClick={() => onSignOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        
      </div>
    </div>
  );
}

export default Header;
