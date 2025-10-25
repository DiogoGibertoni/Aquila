export interface Product {
  _id: string;
  name: string;
  description?: string;
  category: string;
  external_id?: string;
  site_id?: string;
  created_at: string;
}

export interface Price {
  id: number;
  product_id: string;
  price: number;
  original_price: number;
  is_promotion: boolean;
  is_fake_promotion: boolean;
  scraped_at: string;
}

export interface ProductComplete {
  product: Product;
  prices: Price[];
  aggregated_at: string;
}

export interface PriceAnalysis {
  product_id: string;
  current_price: number;
  historical_average: number;
  is_fake_promotion: boolean;
  analysis_date: string;
}
