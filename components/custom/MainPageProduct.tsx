import React from 'react'
import prisma from "@/lib/db"
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
 

const MainPageProduct = async () => {
const products = await prisma.product.findMany()

  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>

      {products.map((products) => {
        return (
          <Link href={`/products/${products.slug}`}>
          <Card>
            <CardHeader>
              <img src={`${products.image}`} alt="product" className="w-full h-40 object-cover rounded-lg" />
              <CardTitle>{products.name}</CardTitle>
              <CardDescription description={products.description} />
            </CardHeader>
            <CardContent content={products.price} className='text-purple-500 text-xl font-extrabold text-center' />
            {/* <CardFooter>

      
            </CardFooter> */}
          </Card>
          </Link>
  )
})}
</div>
</>
  )
}

export default MainPageProduct