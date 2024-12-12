import React from 'react'
import Link from 'next/link'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import prisma from "@/lib/db"


const page = async ({ params }) => {
  const product = await prisma.product.findUnique(
    {
        where:{
            slug: params.slug,
        }
    }
  )
  const ProductCategory = await prisma.product.findMany(
    {
        where:{
            category: product?.category,
        }
    }
  )
  return (
    <>
<div className='m-4'>

{product && (
  <ResizablePanelGroup direction="horizontal">
  <ResizablePanel className='border m-5 p-3'>
    <img src={`${product.image}`} alt=""  className='rounded-xl '/>
  </ResizablePanel>
  <ResizableHandle className='bg-black'/>
  <ResizablePanel className='m-5 p-3 border'>
    <h1 className='text-3xl font-bold text-purple-700 '>{product.name}</h1>
    <p className='text-sm text-gray-500'>{product.description}</p>
    <p className='text-lg'> <span className='font-bold text-blue-700'>Rs.</span> {product.price}</p>  </ResizablePanel>
</ResizablePanelGroup>

)}

<div>

<h1 className='text-3xl text-center font-bold m-4 text-purple-700'>Related Products</h1>
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>

{ProductCategory.map((product) => {
  return (
    <Link href={`/products/${product.slug}`} key={product.id}>
         <Card>
            <CardHeader>
              <img src={`${product.image}`} alt="product" className="w-full h-40 object-cover rounded-lg" />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription description={product.description} />
            </CardHeader>
            <CardContent content={product.price} className='text-purple-500 text-xl font-extrabold text-center' />
            {/* <CardFooter>

      
            </CardFooter> */}
          </Card>
    </Link>
  )
})}
</div>

</div>

</div>  
</>
  )
}

export default page
