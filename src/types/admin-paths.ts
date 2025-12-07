import { AdminEntity } from '@/types';

export type AdminPaths = {
  [K in AdminEntity as `${K}Admin` | `${K}NewAdmin`]: () => string;
} & {
  [K in AdminEntity as `${K}DetailsByIdAdmin` | `${K}EditByIdAdmin`]: (id: string) => string;
};
