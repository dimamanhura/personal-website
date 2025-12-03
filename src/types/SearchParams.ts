import { Order } from "@/types/Order";

export interface SearchParams<> {
  page?: string;
  sortBy?: string;
  order?: Order; 
};
