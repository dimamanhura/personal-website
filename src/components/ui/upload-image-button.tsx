'use client';

import { Button, Image } from '@nextui-org/react';
import { CldUploadWidget } from 'next-cloudinary';
import { FaUpload } from 'react-icons/fa';

interface UploadImageButtonProps {
  title?: string;
  url?: string | null;
  onUpload: (url: string) => void;
}

export const UploadImageButton = ({ title, url, onUpload }: UploadImageButtonProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <h3 className="text-xl font-medium">{title}</h3>}

      {url && (
        <Image
          alt="Uploaded content"
          className="h-[200px] w-full object-cover"
          src={url || undefined}
        />
      )}

      <div className="flex">
        <CldUploadWidget
          signatureEndpoint="/api/cloudinary"
          options={{ maxFiles: 1 }}
          onSuccess={(result) => {
            if (typeof result.info === 'object' && result.info.secure_url) {
              onUpload(result.info.secure_url);
            }
          }}
        >
          {({ open }) => (
            <Button
              startContent={<FaUpload />}
              color="primary"
              variant="flat"
              onPress={() => open()}
            >
              Upload
            </Button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
};
