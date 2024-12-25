import Image from "next/image";
import React from "react";

function ProductList({ productList }) {
  return (
    <div>
      <h2 className="text-green-600 font-bold text-2xl text-">
        Our Popular Products
      </h2>

      {productList.map((product, index) => (
        <div key={index}>
          <Image
            src={
              process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.images[0].url
            }
            alt="image"
            width={200}
            height={200}
          />
          <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
