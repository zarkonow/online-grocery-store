import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function ProductList({ productList }) {
  return (
    <div className="flex flex-col items-center justify-center m-6 ">
      <h2 className="text-green-800 font-bold text-2xl mb-6 text-right">
        Our Popular Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-5 ">
        {productList.map((product, index) => index<5&&(
          <div
            key={index}
            className=" items-center justify-center text-center text-sm  border rounded-2xl 
            hover:scale-110 hover:shadow-2xl transition duration-300 ease-in-out hover:bg-green-100 cursor-pointer"
          >
            <div className="">
              <Image
                src={
                  process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                  product.images[0].url
                }
                alt="image"
                width={400}
                height={400}
                className="object-contain"
              />

              <h2 className="font-bold text-lg">{product.name}</h2>
              <div className="flex items-center justify-center">
                {product.sellingPrice && <h2>${product.sellingPrice}</h2>}
                <p
                  className={`font-bold ${
                    product.sellingPrice && "line-through text-gray-400 ml-3"
                  }`}
                >
                  ${product.mrp}
                </p>
              </div>
              <div className=" p-4">
                <Button
                  variant="outline"
                  className=" text-primary border-primary hover:bg-primary hover:text-white"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
