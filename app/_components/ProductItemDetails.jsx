'use client'
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function ProductItemDetails({ product }) {

const [productTotalPrice, setProductTotalPrice]= useState(
  product.sellingPrice ? product.sellingPrice : product.mrp
)

const[quantity, setQuantity]= useState(1)


  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 p-7
    items-center justify-center text-center 
    "
    >
      <Image
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.images[0].url}
        alt={"image"}
        width={300}
        height={300}
        className="h-[320px] w-[300px]  bg-slate-100 rounded-2xl object-contain"
      />

      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-green-800 text-2xl text-left">
          {product.name}
        </h2>
        <h2 className="font-bold text-sm text-left whitespace-nowrap overflow-hidden text-ellipsis">
          {product.description}
        </h2>

        <div className="flex gap-3">
          {product.sellingPrice && (
            <h2 className="text-3xl text-black">${product.sellingPrice}</h2>
          )}
          <h2
            className={`font-bold ${
              product.sellingPrice && "line-through text-gray-400 text-3xl ml-3"
            }`}
          >
            ${product.mrp}
          </h2>
        </div>

        <h2 className="font-bold text-black  text-left">
          Quantity ({product.itemQuantityType})
        </h2>

        <div className="flex flex-col gap-5 items-baseline">

          <div className="flex gap-5 items-center">
          <div className="p-2 border flex gap-10 items-center px-5">
            <button disabled={quantity==1} onClick={()=>setQuantity(quantity-1)}>-</button>
            <h2>{quantity}</h2>
            <button onClick={()=>setQuantity(quantity+1)}>+</button>
          </div>
          <h2 className="text-2xl font-bold">= ${(quantity * productTotalPrice).toFixed(2)}</h2>
          </div>

          <Button className="flex gap-5  ">
                        <ShoppingBasket/>
                          Add To Cart
                          </Button>
          
        </div>
       <h2 className="text-left"> <span className="font-bold">Category: </span>{product.categories[0].name}</h2>
      </div>
    </div>
  );
}

export default ProductItemDetails;
