import Image from "next/image";
import React from "react";

function ProductItemDetails() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 ">
      <Image
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.images[0].url}
        alt={"image"}
        width={300}
        height={300}
        className="object-contain"
      />
    </div>
  );
}

export default ProductItemDetails;
