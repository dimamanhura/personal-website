import { Order } from "@/types";

export interface SearchParams<> {
  page?: string;
  sortBy?: string;
  order?: Order; 
};
