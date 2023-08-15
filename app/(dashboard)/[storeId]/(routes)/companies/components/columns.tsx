"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import ImagePreview from "@/components/ui/image-preview";

export type CompanyColumn = {
  id: string;
  name: string;
  bannerLabel: string;
  imageUrl: string;
};

export const columns: ColumnDef<CompanyColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({ row }) => row.original.bannerLabel,
  },
  {
    id: "image",
    header: "Banner Background",
    cell: ({ row }) => <ImagePreview data={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
