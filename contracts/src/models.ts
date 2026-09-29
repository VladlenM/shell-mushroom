export interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface Cart {
  lines: CartLine[];
  itemCount: number;
  total: number;
}

export interface CheckoutRequest {
  name: string;
  email: string;
}

export interface Order {
  id: string;
}
