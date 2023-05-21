import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[] = [];
  cartItems: any[] = [];

  constructor() { }

  addToCart(product: any, quantity:number) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      this.cartItems.push({ product: product, quantity: 1 });
    }
  }

  removeFromCart(product: any) {
    const index = this.cartItems.findIndex(item => item.product.id === product.id);

    if (index !== -1) {
      const item = this.cartItems[index];

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.cartItems.splice(index, 1);
      }
    }
  }

  getCartItems() {
    return this.cartItems;
  }
}
