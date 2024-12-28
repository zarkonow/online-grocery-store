import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopCategoryList({ categoryList, selectedCategory }) {
  return (
    <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center">
      {categoryList.map((category, index) => (
        <Link
          href={"/products-category/" + category.name}
          key={index}
          className={`flex flex-col items-center
           bg-green-100 gap-2 p-3 rounded-2xl mt-2 cursor-pointer hover:bg-green-300 group
           w-[150px] min-w-[150px] 
           ${selectedCategory == category.name && "bg-green-600 text-white"}
           `}
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon[0].url
            }
            width={50}
            height={50}
            alt="icon"
            className="group-hover:scale-125 transform transition duration-300"
          />
          <h2
            className={`text-green-800 cursor-pointer group-hover:text-white
             ${selectedCategory == category.name && " text-white"}`}
          >
            {category.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}

export default TopCategoryList;
