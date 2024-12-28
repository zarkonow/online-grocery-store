import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetails from "./ProductItemDetails";

const ProductCard = ({ product }) => {
  return (
    <div
      className="items-center justify-center text-center border rounded-2xl
      hover:scale-110 hover:shadow-2xl transition duration-300 ease-in-out hover:bg-green-100 cursor-pointer"
    >
      
      <Image
        src={
          product.images?.[0]?.url
            ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.images[0].url
            : "/placeholder-image.png"
        }
        alt="image"
        width={400}
        height={400}
        className="object-contain"
      />
      <h2 className="font-bold text-green-800 text-base whitespace-nowrap overflow-hidden text-ellipsis">
        {product.name}
      </h2>
      <div className="flex items-center justify-center text-2xl">
        {product.sellingPrice && <h2>${product.sellingPrice}</h2>}
        <p
          className={`font-bold text-2xl ${
            product.sellingPrice && "line-through text-gray-400 ml-3"
          }`}
        >
          ${product.mrp}
        </p>
      </div>
      <div className="p-4 ">
        <Dialog >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              Add to Cart
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle ></DialogTitle>
            <DialogHeader>
              

              <DialogDescription asChild>
              
                <ProductItemDetails product={product}  />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

function ProductList({ productList }) {
  if (!productList || productList.length === 0) {
    return <p className="text-center text-gray-500">No products available at the moment.</p>;
  }

  const maxProductsToShow = 6;

  return (
    <div className="flex flex-col items-center justify-center m-6">
      <h2 className="text-green-800 font-bold text-2xl mb-6 text-right">
        Our Popular Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {productList.slice(0, maxProductsToShow).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
