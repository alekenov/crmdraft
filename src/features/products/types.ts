export interface IBaseProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  sku: string;
  image_url?: string;
  active: boolean;
}

export interface IInventoryItem {
  id: string;
  quantity: number;
  location: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface IProduct extends IBaseProduct {
  inventory?: IInventoryItem[];
}

export interface IProductFilters {
  search: string;
  category: string[];
  priceRange: {
    min: number;
    max: number;
  };
  type: 'all' | 'single' | 'combo';
} 