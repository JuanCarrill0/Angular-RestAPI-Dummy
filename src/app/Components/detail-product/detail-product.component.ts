import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/Services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {
  currentImageIndex: number = 0;
  quantity: number = 1; // Variable para almacenar la cantidad ingresada por el usuario

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: any,
    private dialogRef: MatDialogRef<DetailProductComponent>,
    private productService: ProductService
  ) {}

  closeProductDetails() {
    this.dialogRef.close();
  }

  navigateImages(direction: 'prev' | 'next') {
    if (direction === 'prev') {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
    } else {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    }
  }

  addToCart() {
    this.productService.addToCart(this.product, this.quantity); // Pasar la cantidad al método addToCart()
    this.dialogRef.close(); // Cierra el componente de detalle
    Swal.fire({
      icon: 'success',
      title: 'Añadido al carrito.',
    });
  }
}

