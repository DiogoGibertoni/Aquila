import { Product, Price, ProductComplete, PriceAnalysis } from "@/types/product";

const BFF_URL = import.meta.env.VITE_BFF_URL || "http://localhost:3000";

// Products
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BFF_URL}/api/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${BFF_URL}/api/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

export const getProductComplete = async (id: string): Promise<ProductComplete> => {
  const response = await fetch(`${BFF_URL}/api/products/${id}/complete`);
  if (!response.ok) throw new Error("Failed to fetch product with prices");
  return response.json();
};

export const createProduct = async (product: Omit<Product, "_id" | "created_at">): Promise<Product> => {
  const response = await fetch(`${BFF_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const response = await fetch(`${BFF_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${BFF_URL}/api/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
};

// Prices
export const getPrices = async (): Promise<Price[]> => {
  const response = await fetch(`${BFF_URL}/api/prices`);
  if (!response.ok) throw new Error("Failed to fetch prices");
  return response.json();
};

export const getPricesByProduct = async (productId: string): Promise<Price[]> => {
  const response = await fetch(`${BFF_URL}/api/prices/product/${productId}`);
  if (!response.ok) throw new Error("Failed to fetch prices for product");
  return response.json();
};

export const addPrice = async (
  priceData: Omit<Price, "id" | "is_fake_promotion" | "scraped_at">
): Promise<{ message: string; data: Price }> => {
  const response = await fetch(`${BFF_URL}/api/prices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(priceData),
  });
  if (!response.ok) throw new Error("Failed to add price");
  return response.json();
};

export const analyzePrice = async (
  productId: string,
  currentPrice: number
): Promise<PriceAnalysis> => {
  const response = await fetch(`${BFF_URL}/api/analyze-price`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, current_price: currentPrice }),
  });
  if (!response.ok) throw new Error("Failed to analyze price");
  return response.json();
};
