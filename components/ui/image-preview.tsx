import { BannerColumn } from "@/app/(dashboard)/[storeId]/(routes)/banners/components/columns";
import { CompanyColumn } from "@/app/(dashboard)/[storeId]/(routes)/companies/components/columns";
import Image from "next/image";
import React from "react";

interface ImagePreviewProps {
  data: CompanyColumn | BannerColumn;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ data }) => {
  return (
    <div className="w-30 h-30 overflow-hidden ">
      <Image
        src={data.imageUrl}
        alt="Image"
        width={200}
        height={200}
        layout="fixed"
        className="rounded-lg border-2 dark:border-white border-grey"
      />
    </div>
  );
};

export default ImagePreview;
