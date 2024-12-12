import React from 'react'
import DeleteProducts from '@/components/custom/DeleteProducts'
import EditDialog from '@/components/custom/EditDialog'
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


const page = async () => {
  const products = await prisma.product.findMany();

  return (
    <>

    <h1 className='text-3xl text-center font-bold m-4 text-purple-700'>Edit and Delete Products</h1>

    <hr className='m-4' />

    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-4'>

      {products.map((products) => {
        return (
          <Card>
            <CardHeader>
              <img src={`${products.image}`} alt="product" className="w-full h-40 object-cover rounded-lg border" />
              <CardTitle/>
              <CardDescription description={products.description} />
            </CardHeader>
            <CardContent content={products.price} className='text-purple-500 text-xl font-extrabold float-right' />
            <CardFooter>

              {/* <Button variant="secondary" className='mr-2'>Edit</Button> */}
              {/* <Button variant="destructive" className='mx-3'>Delete</Button>   */}
              <EditDialog id={products.id} name={products.name} description={products.description} price={products.price} category={products.category} image={products.image}/>
              <DeleteProducts id={products.id}  name={products.name}/>
      
            </CardFooter>
          </Card>
      
  )
})}
</div>
</>
  )
}

export default page
