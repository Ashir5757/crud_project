"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from 'sonner'; 
import "react-toastify/dist/ReactToastify.css";

import { createProduct } from "@/action/actions";

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

// Form validation schema using zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  price: z.preprocess(
    (value) => parseFloat(value as string),
    z.number().nonnegative({
      message: "Price must be a valid number and non-negative.",
    })
  ),
  category: z.string().min(1, { message: "Category is required." }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, { message: "Invalid image file." }),
});

const AlertDialog = () => {

  const [isSubmitting, setIsSubmitting] = useState(false); // Manage submit state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      image: undefined,
    },
  });

  // Submit handler
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true); // Disable the form while submitting

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price.toString());
      formData.append("category", data.category);
      if (data.image) {
        formData.append("image", data.image);
      }

      // Call createProduct API
      const product = await createProduct(formData);

      if (product?.success) {
        toast.success(product.message || "Product added successfully!");
        form.reset();
      } else {
        throw new Error(product?.message || "An error occurred.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add product.");
    } finally {
      setIsSubmitting(false); // Re-enable the form
    }
  };

  return (
    <div>
      <UIAlertDialog>
        <AlertDialogTrigger className="bg-purple-600 px-4 py-3 text-white font-bold rounded hover:bg-purple-800">
          Add Products
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Products</AlertDialogTitle>
            <AlertDialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
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
                          <Textarea
                            placeholder="Enter product description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 space-x-3">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter product price"
                              {...field}
                            />
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
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0] || undefined)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${
                        isSubmitting ? "bg-gray-400 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Adding..." : "Add Product"}
                    </Button>
                    <AlertDialogCancel className="mx-2">
                      Cancel
                    </AlertDialogCancel>
                  </div>
                </form>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </UIAlertDialog>
    </div>
  );
};

export default AlertDialog;
