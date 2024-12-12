"use client";

import { deleteProduct } from "@/action/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';  // Import Sonner for notifications

const DeleteProducts = (props) => {
  
  const handleDelete = async () => {
    try {
    const delPro = await deleteProduct(props.id);  // Call the delete action
    if (delPro?.success) {
        toast.success(delPro.message || "Product Deleted successfully!"); // Show success toast
    }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(`Failed to delete product "${props.name}".`);  // Show error toast
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 p-2 rounded-sm text-white">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete 
            <strong className="font-bold"> {props.name} </strong> 
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProducts;
