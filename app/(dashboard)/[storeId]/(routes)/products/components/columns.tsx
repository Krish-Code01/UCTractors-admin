"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Decimal } from "@prisma/client/runtime";

export type ProductColumn = {
  id: string;
  name: string;
  tyre: string;
  condition: string;
  model: Decimal;
  price: string;
  company: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "model",
    header: "Model Year",
  },
  {
    accessorKey: "tyre",
    header: "Tyre Condition",
  },
  {
    accessorKey: "condition",
    header: "Tractor Condition",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
