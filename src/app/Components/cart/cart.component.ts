import { Component } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private productService: ProductService) {
    this.cartItems = this.productService.getCartItems();
  }

  removeFromCart(item: any) {
    this.productService.removeFromCart(item.product);
    this.cartItems = this.productService.getCartItems();
  }

  getTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.product.price * item.quantity;
    }
    return total;
  }

  //Metoo que elimina todos los items del carrito al completar la compra
  completePurchase() {
    const total = this.getTotal();
    this.cartItems = [];
    console.log('Total de la compra:', total);
  }
}

