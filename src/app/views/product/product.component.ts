import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.findAllProducts();
  }

  navigateToProductCreate():void {
    this.router.navigate(['/new-product']);
  }

  delete(id :string):void {
   this.productService.delete(id).subscribe(() => {
     this.productService.showMessage('Produto deletado com sucesso!');
     this.findAllProducts();
   })
  }

  findAllProducts() {
    this.productService.findAll().subscribe(resp => {
      this.products = resp;
    });
  }

}
