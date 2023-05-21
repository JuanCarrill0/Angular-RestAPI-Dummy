import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { CartComponent } from '../cart/cart.component';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  currentPage = 1;
  totalPages: number[] = [];
  searchText: string = '';

  selectedProduct: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }


  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const startProductId = (this.currentPage - 1) * 20 + 1;
    const endProductId = this.currentPage * 20;
    
    this.products = []; // Limpiar el arreglo antes de cargar nuevos productos
    this.totalPages = []; // Limpiar el arreglo de páginas

    const requests = [];

    for (let i = startProductId; i <= endProductId; i++) {
      const url = `https://dummyjson.com/products/${i}`;
      requests.push(this.http.get<any>(url));
    }

    forkJoin(requests).subscribe((responses) => {
      this.products = responses;
    });

    // Calcular el número total de páginas disponibles
    const totalProducts = 100; // Total de productos en la API (ejemplo: 100 productos)
    const itemsPerPage = 20; // Número de productos por página (ejemplo: 20 productos por página)
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      this.totalPages.push(i);
    }
  }

  showProductDetails(product: any) {
    this.selectedProduct = product;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  getColorForStock(stock: number) {
    if (stock < 10) {
      return 'red';
    } else if (stock >= 10 && stock <= 50) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  openProductDetails(product: any) {
    const dialogRef = this.dialog.open(DetailProductComponent, {
      data: product,
      width: '80%' // Ajusta el ancho según tus necesidades
    });

    dialogRef.afterClosed().subscribe(() => {
      // Realiza alguna acción después de cerrar el componente de detalle
    });
  }

  openCart() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '80%' // Ajusta el ancho según tus necesidades
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // Realiza alguna acción después de cerrar el componente del carrito
    });
  }
}
