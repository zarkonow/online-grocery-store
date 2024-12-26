
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";



function Slider({sliderList}) {
  return (
    <Carousel className="cursor-pointer">
    <CarouselContent >
      {sliderList.map((slider, index)=>(
        <CarouselItem key={index}>
          <Image src={
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${slider.image[0].url}`
        }
          alt="slider"
          width={1000}
          height={400}
          className="w-full h-[300px] md:h-[400px] object-cover rounded-3xl "
          
          />
        </CarouselItem>
      ))}
      
    
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  
  );
}

export default Slider;
