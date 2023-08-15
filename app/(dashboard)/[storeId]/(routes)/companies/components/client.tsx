"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, CompanyColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface CompanyClientProps {
  data: CompanyColumn[];
}

export const CompanyClient: React.FC<CompanyClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Company (${data.length})`}
          description="Manage companies for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/companies/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Company" />
      <Separator />
      <ApiList entityName="companies" entityIdName="companyId" />
    </>
  );
};
