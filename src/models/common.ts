export interface Pagination {
  limit: number;
  page: number;
  total: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface ListParams {
  page?: number;
  size?: number;
  sort?: 'asc' | 'desc';
  [key: string]: any;
}

export interface SideBarElement {
  key: string;
  text: string;
  url: string;
}

export interface DropdownElement {
  image: string;
  value: string;
  label: string;
}
