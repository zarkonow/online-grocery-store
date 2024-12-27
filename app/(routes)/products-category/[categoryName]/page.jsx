import React from "react";

function ProductCategory({ params }) {
  const categoryName = decodeURIComponent(params.categoryName);
  return (
    <div>
      ProductCategory
      <p>Category: {categoryName} </p>
    </div>
  );
}

export default ProductCategory;
