import Products from "@/components/custom/MainPageProduct"
import AlertDialog from "@/components/custom/AlertDialog"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"




const page = () => {


  return (
    <>
      <div className='p-5'>
        <div className="flex justify-center m-3">
          <Carousel>
            <CarouselContent>
              <CarouselItem> <img src="/images/products/amanz-FkEfFVrbM3o-unsplash.jpg" alt="Product Image" className="rounded-md w-full h-60 object-cover" /> </CarouselItem>
              <CarouselItem> <img src="/images/products/logan-gutierrez-2c7udssDpMI-unsplash.jpg" alt="Product Image" className="rounded-md w-full h-60 object-cover" /> </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </div>
        <hr className="m-3" />

<AlertDialog/>

        <div>
          <Products />
        </div>

    </div>
      </>
  )
}

      export default page
