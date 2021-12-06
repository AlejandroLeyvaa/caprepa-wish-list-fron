import { Component, OnInit } from '@angular/core';
import {
  DomSanitizer
} from '@angular/platform-browser';



@Component({
  selector: 'app-create-wish-list',
  templateUrl: './create-wish-list.component.html',
  styleUrls: ['./create-wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  productName: string = '';
  productPrice: string = '';
  productComment: string = '';
  productUrl: string = '';
  productsList: any[] = [];
  show: boolean = false;
  imageURL: any;
  file: any;
  counter = 0;
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const buttonSubmit = document.getElementById('submit');

    buttonSubmit?.setAttribute('disabled', 'true');

  }

  ngAfterContentChecked(): void {
    const buttonSubmit = document.getElementById('submit');

    const {
      productName,
      productPrice,
      productComment,
    } = this;
    if(!productName.length || !productPrice.length) {
      buttonSubmit?.setAttribute('disabled', 'true');
      return;
    }

    buttonSubmit?.removeAttribute('disabled');
  }

  getImageFromFileInput(event: any) {
    const file = event.target.files[0];
    const imageURL = window.URL.createObjectURL(file);

    this.file = file;
    
    this.imageURL = this.sanitizer.bypassSecurityTrustUrl(imageURL);
  }

  addProduct() {
    const img = document.createElement('img');
    const formData = new FormData();
    const localStorageDataId: string | null = localStorage.getItem('user-id');
    
    formData.append('wish-image', this.file);
    formData.append('wish_name', this.productName);
    formData.append('wish_price', this.productPrice);
    formData.append('wish_description', this.productComment);
    formData.append('wish_url', this.productUrl);
    formData.append('user_id', localStorageDataId!!);

    img.src = this.imageURL;
    const data = {
      product: {
        wish_name: this.productName,
        wish_price: this.productPrice,
        wish_description: this.productComment,
        wish_url: this.productUrl,
      },
      user: {
        name: localStorage.getItem('user-name'),
      },
      imageData: {
        file: this.file,
        url: this.imageURL,
      }
    }
    this.productsList.push(data);

    console.log(`this.productsList`, this.productsList)
    this.productsList.map((item) => console.log(item.imageData.url));
    this.sendData(formData);
  }

  sendData(data: any) {
    fetch('https://9109-201-164-62-254.ngrok.io/api/wish-list', {
      method: 'POST',
      body: data,
    }).then((response) => response.json())
      .then((data) => console.log(data));
  }

}
