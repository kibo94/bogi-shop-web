import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { deleteProduct } from "@store/actions";
import { useAppDispatch } from "@store/hooks/hooks";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
interface ProductProps {
  id: string;
}
function ProductDropDown({ id }: ProductProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
            dispatch(deleteProduct(id));
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProductDropDown;
