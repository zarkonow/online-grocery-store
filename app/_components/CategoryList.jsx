import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <div className="mt-5">
      <h2 className="text-green-800 font-bold text-2xl mb-4 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5">
        {categoryList.map((category, index) => (

          <Link href={'/products-category/' + category.name } key={index} className="flex flex-col items-center
           bg-green-100 gap-2 p-3 rounded-2xl mt-2 cursor-pointer hover:bg-green-300 group
           
           ">
            <Image
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon[0].url
              }
              width={50}
              height={50}
              alt="icon"
              className="group-hover:scale-125 transform transition duration-300"
            />
            <h2 className="text-green-800 font-bold cursor-pointer">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
