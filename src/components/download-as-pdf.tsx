'use client';

import { Button } from "@nextui-org/react";
import { FaFilePdf } from "react-icons/fa";

export const DownloadAsPdf = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
   <Button
      startContent={<FaFilePdf />}
      className="print:hidden"
      color="primary"
      variant="flat"
      onClick={handleDownload}
    >
      Export
    </Button>
  );
};
