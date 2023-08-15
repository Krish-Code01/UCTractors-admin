"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import ImagePreview from "@/components/ui/image-preview";

export type BannerColumn = {
  id: string;
  label: string;
  imageUrl: string;
};

export const columns: ColumnDef<BannerColumn>[] = [
  {
    id: "image",
    header: "Background",
    cell: ({ row }) => <ImagePreview data={row.original} />,
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
