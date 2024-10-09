import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
interface ProductProps {
  id: string;
  deleteProduct: () => void;
}
function ProductDropDown({ id, deleteProduct }: ProductProps) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="sr-only">Actions</span>
        <MoreVertical className="relative z-20" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/admin/products/${id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await fetch("/api/products", {
              method: "DELETE",
              body: JSON.stringify({
                id,
              }),
            });
            deleteProduct();
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProductDropDown;
