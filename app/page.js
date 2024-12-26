import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getProducts();
  return (
    <div className=" p-5  md:p-10 px-15 bg-gray-50">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList}/>

      <Image src="/banner-footer.png" 
      alt="footer" 
      width={1000} 
      height={300} 
      className="w-full object-contain"
      />
      <Footer/>
    </div>
  );
}
