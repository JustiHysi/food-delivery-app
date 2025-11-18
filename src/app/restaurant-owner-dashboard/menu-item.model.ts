export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  quantity?: number; // Optional, used only in Order Management
}
