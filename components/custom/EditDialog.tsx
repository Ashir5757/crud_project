"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from 'sonner'; 

import { updateProduct } from "@/action/actions"; // Verify the correct path

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog as UIAlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Form validation schema using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  price: z.preprocess(
    (value) => parseFloat(value),
    z.number().nonnegative({
      message: "Price must be a valid number and non-negative.",
    })
  ),
  category: z.string().min(1, { message: "Category is required." }),
  image: z.instanceof(File).optional(), // Allow optional image upload
});

const EditDialog = ({ id, name, description, price, category, image }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(image); // Store the existing image

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      description: description || "",
      price: price?.toString() || "",
      category: category || "",
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price.toString());
      formData.append("category", data.category);

      // Append the image only if a new one is uploaded
      if (data.image) {
        formData.append("image", data.image);
      } else {
        formData.append("currentImage", currentImage); // Retain old image if no new one
      }

      const result = await updateProduct(id, formData);
      if (result?.success) {
        toast.success(result.message || "Product updated successfully!");
        form.reset();
        window.location.reload();
        // reload page 
      } else {
        throw new Error(result?.message || "An error occurred while updating the product.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UIAlertDialog>
      <AlertDialogTrigger className="bg-purple-600 px-4 py-2 text-white font-bold rounded hover:bg-purple-800 mr-2">
        Edit
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Product</AlertDialogTitle>

          <AlertDialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Enter product description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" placeholder="Enter product price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[215px]">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="hotels&dealers">
                                Hotels & Dealers
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                            }
                          }}
                        />
                      </FormControl>
                      {currentImage && (
                        <img src={currentImage} alt="Current" className="w-2/4 h-2/4 my-2 rounded-md shadow-md shadow-purple-600" />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button type="submit" disabled={isSubmitting} >
                    {isSubmitting ? "Updating..." : "Update Product"}
                  </Button>
                  <AlertDialogCancel className="mx-2">Cancel</AlertDialogCancel>
                </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </UIAlertDialog>
  );
};

export default EditDialog;
