export interface ProductInfo {
  id: number;
  name: string;
  description: string;
  publicIdCloudary?: string;
  price: any;
  quantityInStock: number;
  pictureUrl: string;
  category: {
    name: string;
  };
  brand: {
    name: string;
  };
}

export interface ProductResponse {
  statusCode: number;
  massage: string;
  data: ProductInfo[];
}
