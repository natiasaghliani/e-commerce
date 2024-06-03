import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basketProducts: any[]=[];

  constructor() {
    const storedBasket = localStorage.getItem('basket');

    if (storedBasket) {
      this.basketProducts = JSON.parse(storedBasket);
      this.basketProducts.forEach((element: any) => {
        const findItem = this.basketProducts.find((item: any) => item.id === element.id) 
        
        if (findItem && element.id === findItem?.id) {
          
          findItem.quantity = element.quantity
        }
      });

      console.log(this.basketProducts)

    }
   }
  
  addToBasket(product: any): void {
    const findProduct = this.basketProducts.find(
      (element: any) => element.id === product.id
    );
    console.log(11111111, findProduct, product, this.basketProducts);

    if (findProduct) {
      if (findProduct.quantity < findProduct.stock) {
        findProduct.quantity++;
        product.quantity = findProduct.quantity
      } else {
        console.log('Maximum quantity reached for this item.');
      }
    } else {
      product.quantity = 1;
      this.basketProducts.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(this.basketProducts));


  }

  removeItem(product: any, permanentDelete = false): void {
    const findProduct = this.basketProducts.find(
      (element: any) => element.id === product.id
    );
    const index = this.basketProducts.findIndex(
      (item: any) => item.id === product.id
    );

    if (index !== -1) {
      if (findProduct.quantity > 0 && !permanentDelete) {
        findProduct.quantity--;
        product.quantity = findProduct.quantity

      } if (findProduct.quantity === 0 || permanentDelete) {
        this.basketProducts.splice(index, 1);
      }
    }
    localStorage.setItem('basket', JSON.stringify(this.basketProducts));
  }

  total(product: any){

    if (product.quantity === 1) {
      const totalPrice = product.price

      return +totalPrice?.toFixed(2)
    }else if(product.quantity > 1) {
     const totalPrice = product.price * product.quantity

     return +totalPrice.toFixed(2)
    }
    return +product.price.toFixed(2)
    
  }

  subTotal() {
    let sum = 0
    this.basketProducts.forEach(product => {
      sum += this.total(product)
    }) 
    return parseFloat(sum.toFixed(2));

  }

  taxes() {
    const subTotal = this.subTotal();
    const tax = Math.round(subTotal * 0.1);
    return tax;
  }

  shipping() {
    
    return (!this.subTotal() || this.subTotal() > 1000) ? 0 : 20
  }

  totalPrice() {
    let orderPrice = this.subTotal() + this.taxes() + this.shipping();
    return parseFloat(orderPrice.toFixed(2));
  }

  clearCart() {
    this.basketProducts = [];
  }
  
}
