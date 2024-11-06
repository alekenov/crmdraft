export type TProductStatus = 'active' | 'inactive';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  status: TProductStatus;
  image_url?: string;
  inventory?: IInventory[];
  created_at: string;
  updated_at: string;
}

export interface IInventory {
  id: number;
  product_id: number;
  quantity: number;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
} 