import prismadb from "@/lib/prismadb";

import { CompanyForm } from "./components/company-form";

const CompanyPage = async ({
  params,
}: {
  params: { companyId: string; storeId: string };
}) => {
  const company = await prismadb.company.findUnique({
    where: {
      id: params.companyId,
    },
  });

  const banners = await prismadb.banner.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CompanyForm banners={banners} initialData={company} />
      </div>
    </div>
  );
};

export default CompanyPage;
