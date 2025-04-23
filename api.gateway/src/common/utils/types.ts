export type PaginationMeta = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export type CustomerInfo = {
  name: string;
  email: string;
};
