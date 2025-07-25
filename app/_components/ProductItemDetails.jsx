"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

function ProductItemDetails({ product }) {
  const jwt = sessionStorage.getItem("jwt");

  const user = JSON.parse(sessionStorage.getItem("user"));
  const {updateCart, setUpdateCart} = useContext(UpdateCartContext);
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.sellingPrice ? product.sellingPrice : product.mrp
  );
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addToCart = async () => {
    setLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }
    
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        product: product.id,
        users_permissions_user: user.id,
        userId: user.id,
      },
    };
    console.log(data);

    GlobalApi.addToCart(data, jwt).then(
      (resp) => {
        // console.log(resp);
        toast("success: Product added to cart successfully");
        setUpdateCart(!updateCart);
        setLoading(false);
      },
      (e) => {
        toast("error", "Product already exists in cart");
        setLoading(false);
      }
    );
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 p-7 cursor-pointer
      items-center justify-center gap-8 overflow-x-hidden"
    >
      <Image
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.images[0].url}
        alt={"image"}
        width={300}
        height={300}
        className="bg-slate-100 rounded-2xl object-contain md:object-contain"
      />

      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-green-800 text-2xl">{product.name}</h2>
        <h2 className="font-bold text-sm text-gray-600 line-clamp-2">
          {product.description}
        </h2>

        <div className="flex gap-3 items-baseline ">
          {product.sellingPrice && (
            <h2 className="text-5xl text-black">${product.sellingPrice}</h2>
          )}
          <h2
            className={`font-bold text-5xl ${
              product.sellingPrice && "line-through text-gray-400 ml-3"
            }`}
          >
            ${product.mrp}
          </h2>
        </div>

        <h2 className="font-bold text-black">
          Quantity ({product.itemQuantityType})
        </h2>

        <div className="flex flex-col gap-5 items-start">
          <div className="flex gap-5 items-center">
            <div className="p-2 border rounded-md flex gap-5 items-center">
              <button
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
              >
                -
              </button>
              <h2 className="text-lg font-semibold">{quantity}</h2>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <h2 className="text-2xl font-bold">
              = ${(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>

          <Button
            className="flex gap-3"
            onClick={() => addToCart()}
            disabled={loading}
          >
            <ShoppingBasket />
            {loading ? <LoaderCircle /> : "Add To Cart"}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {product.categories[0].name}
        </h2>
      </div>
    </div>
  );
}

export default ProductItemDetails;
