'use client';

import { ChangeEvent, useState, useTransition } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  ScrollShadow,
} from '@nextui-org/react';
import { FaCheckCircle, FaExclamationCircle, FaSyncAlt, FaUpload } from 'react-icons/fa';
import { toast } from 'sonner';
import { z } from 'zod';
import { ImportInput, ItemError } from '@/components';
import { formatErrors, getErrorMessage } from '@/utils';

interface ImportModalProps<T> {
  schema: z.ZodSchema<T>;
  title: string;
  renderLabel: (item: T, idx: number) => string | JSX.Element;
  onImport: (data: T[]) => Promise<void>;
}

export const ImportDataButton = <T,>({
  schema,
  title,
  renderLabel,
  onImport,
}: ImportModalProps<T>) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  const [stagedData, setStagedData] = useState<{ data: T; isValid: boolean; error?: string }[]>([]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const items = Array.isArray(json) ? json : [json];

        const validatedItems = items.map((item) => {
          const result = schema.safeParse(item);
          return {
            data: item,
            isValid: result.success,
            error: !result.success ? formatErrors(result.error) : undefined,
          };
        });

        setStagedData(validatedItems);
      } catch {
        toast.error('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
  };

  const handleConfirm = () => {
    const validData = stagedData.filter((i) => i.isValid).map((i) => i.data);

    startTransition(async () => {
      try {
        await onImport(validData);
        toast.success(`Successfully imported ${validData.length} items`);
        setStagedData([]);
        onClose();
      } catch (err: unknown) {
        toast.error(getErrorMessage(err));
      }
    });
  };

  const hasErrors = stagedData.some((i) => !i.isValid);
  const canSubmit = stagedData.length > 0 && !hasErrors;

  return (
    <>
      <Button startContent={<FaUpload />} color="default" variant="flat" onClick={onOpen}>
        Import
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex items-center justify-between pr-12">
            Import {title} via JSON
          </ModalHeader>
          <ModalBody>
            {stagedData.length === 0 ? (
              <ImportInput handleFileChange={handleFileChange} />
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between px-1 text-xs font-semibold text-default-500">
                  <span>PREVIEW ({stagedData.length} items found)</span>
                  <span className={hasErrors ? 'text-danger' : 'text-success'}>
                    {hasErrors ? 'Fix errors in JSON to proceed' : 'All items valid'}
                  </span>
                </div>

                <ScrollShadow className="max-h-[350px] rounded-lg border border-divider">
                  <div className="divide-y divide-divider">
                    {stagedData.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between gap-2 p-3 ${!item.isValid ? 'bg-danger-50/50' : ''}`}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{renderLabel(item.data, idx)}</span>
                          {item.error && <ItemError error={item.error} />}
                        </div>

                        {item.isValid ? (
                          <FaCheckCircle className="text-success" />
                        ) : (
                          <Tooltip className="max-w-56" content={item.error} color="danger">
                            <div className="cursor-help text-danger">
                              <FaExclamationCircle />
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    ))}

                    <div className="flex justify-center bg-default-50 p-3">
                      <Button
                        size="sm"
                        variant="light"
                        color="primary"
                        startContent={<FaSyncAlt />}
                        onClick={() => setStagedData([])}
                      >
                        Select a different file
                      </Button>
                    </div>
                  </div>
                </ScrollShadow>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                setStagedData([]);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button color="primary" disabled={!canSubmit || isPending} onPress={handleConfirm}>
              {isPending ? 'Loading...' : 'Import'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
