import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CompanyColumn } from "./components/columns";
import { CompanyClient } from "./components/client";

const CompaniesPage = async ({ params }: { params: { storeId: string } }) => {
  const companies = await prismadb.company.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      banner: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCompanies: CompanyColumn[] = companies.map(item => ({
    id: item.id,
    name: item.name,
    bannerLabel: item.banner.label,
    imageUrl: item.banner.imageUrl,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CompanyClient data={formattedCompanies} />
      </div>
    </div>
  );
};

export default CompaniesPage;
