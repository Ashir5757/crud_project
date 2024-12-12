import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"
import Link from 'next/link'


const page = async () => {
  const products = await prisma.product.findMany({
    where:{
      category: "clothing"
    }
  })
  return (
    <>
    <div className='grid grid-cols-3 gap-2 m-5 p-5'>

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

export default page
