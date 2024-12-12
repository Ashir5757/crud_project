"use server";

import prisma from "@/lib/db";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import path from "path";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || "";
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File | null;

  if (!name || !category || isNaN(price)) {
    throw new Error("Invalid data. Name, category, and price are required.");
  }

  // Save the image file to public/images/products directory
  let imagePath: string | null = null;

  if (imageFile) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageName = `${Date.now()}-${imageFile.name}`;
    const savePath = path.join(process.cwd(), "public", "images", "products", imageName);

    await fs.writeFile(savePath, Buffer.from(imageBuffer));
    imagePath = `/images/products/${imageName}`;
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        slug: name.replace(/\s+/g, "-").toLowerCase(),
        description,
        price,
        category,
        image: imagePath,
      },
    });
revalidatePath('/');
    return { success: true, message: "Product created successfully!" };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, message: "Failed to create product." };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  console.log('id', id);
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || "";
  const priceValue = formData.get("price") as string;
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File | null;
  const currentImage = formData.get("currentImage") as string | null; // Handle existing image

  console.log('currentImage', currentImage);

  // Validate required fields
  if (!name || !category || !priceValue) {
    throw new Error("Name, category, and price are required.");
  }

  const price = parseFloat(priceValue);
  if (isNaN(price) || price < 0) {
    throw new Error("Price must be a valid non-negative number.");
  }

  let imagePath: string | null = currentImage; // Retain current image path if no new image

  // Handle new image upload if provided
  if (imageFile) {
    try {
      const imageBuffer = await imageFile.arrayBuffer();
      const sanitizedImageName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '-')}`;
      const savePath = path.join(process.cwd(), "public", "images", "products", sanitizedImageName);

      // Write the image to the public directory
      await fs.writeFile(savePath, Buffer.from(imageBuffer));
      imagePath = `/images/products/${sanitizedImageName}`;
    } catch (fileError) {
      console.error("Error uploading image:", fileError);
      throw new Error("Failed to upload the image.");
    }
  }

  try {
    // Verify the product exists
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return { success: false, message: "Product not found." };
    }

    // Update the product with new data
    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug: name.trim().replace(/\s+/g, "-").toLowerCase(),
        description,
        price,
        category,
        image: imagePath || product.image, // Use the new or existing image
      },
    });

    // Revalidate the path to reflect changes on the frontend
    revalidatePath('/products'); // Adjust based on your app’s route
     // Adjust based on your app’s route

    return { success: true, message: "Product updated successfully!" };
  } catch (dbError) {
    console.error("Database update error:", dbError);
    return { success: false, message: "Failed to update product. Please try again later." };
  }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
  try {
    // Check if the product exists
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return { success: false, message: "Product not found." };
    }

    // Delete the product
    await prisma.product.delete({ where: { id } });

    // Revalidate the product listing page to reflect the deletion
    revalidatePath('/products');  // Adjust the path based on your app's route structure

    // Return success message
    return { success: true, message: "Product deleted successfully!" };
  } catch (error: unknown) {  // Use `unknown` for better error handling
    // Log the error for debugging
    console.error("Error deleting product:", error);

    // Return a generic error message to the client
    return { success: false, message: "Failed to delete the product. Please try again later." };
  }
}