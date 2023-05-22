import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { CartComponent } from '../cart/cart.component';
import { HttpRequestService } from 'src/app/Services/http-request.service';
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
  itemsPerPage: number = 20;
  totalProducts: number = 100;

  constructor(
    private httpRequestService: HttpRequestService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTotalProducts();
    this.loadProducts();
  }

  getTotalProducts() {
    this.httpRequestService.getTotalProducts().subscribe((total) => {
      this.totalProducts = total;
      this.calculateTotalPages();
    });
  }

  loadProducts() {
    const startProductId = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endProductId = this.currentPage * this.itemsPerPage;
  
    this.products = []; // Clear the array before loading new products
    this.totalPages = []; // Clear the pages array
  
    if (this.searchText !== "") {
      this.httpRequestService.searchProducts(this.searchText).subscribe((response) => {
        this.products = response.products;
  
        // Actualizar la paginación con base en los productos encontrados
        const totalProducts = response.total;
        const totalPages = Math.ceil(totalProducts / this.itemsPerPage);
  
        for (let i = 1; i <= totalPages; i++) {
          this.totalPages.push(i);
        }
      });
    } else {
      this.httpRequestService.getAllProducts().subscribe((response) => {
        this.products = response;
  
        // Calcular el número total de páginas disponibles
        const totalProducts = this.totalProducts; // Utilizamos el valor previamente obtenido
        const totalPages = Math.ceil(totalProducts / this.itemsPerPage);
  
        for (let i = 1; i <= totalPages; i++) {
          this.totalPages.push(i);
        }
      });
    }
  }
  
  calculateTotalPages() {
    this.totalPages = [];

    const totalPages = Math.ceil(this.products.length / this.itemsPerPage);

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

