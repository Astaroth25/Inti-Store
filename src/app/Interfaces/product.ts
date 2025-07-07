export interface ProductPaginationI {
  products: ProductI[],
  currentPage: number,
  limitPerPage: number,
  totalProducts: number,
  totalPages: number,
  nextPage: number | null,
  previousPage: number | null
}

export interface ProductI {
  id: string;
  name: string;
  brand: string;
  price: string;
  description: string;
  link: string;
  rate: number;
  highlight?: boolean;
  stock: number;
}
