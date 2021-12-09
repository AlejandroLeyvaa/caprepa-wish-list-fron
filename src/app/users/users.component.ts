import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  wishList: any[] = [];
  URL: string = 'http://61fa-201-164-62-254.ngrok.io:3000/';
  constructor() { }

  ngOnInit(): void {
    this.getWishListOfAllUsers();
  }

  async getWishListOfAllUsers(): Promise<any> {
    const URL  = 'http://61fa-201-164-62-254.ngrok.io:3000/api/wish-list/users-wish-list';
    const response = await fetch(URL);
    const { data } = await response.json();
    
    this.wishList = data;

    console.log('this.wishList :>> ', this.wishList.sort((a,b) => a.user_id-b.user_id));

    return data;
  }

  edit(wish: any) {
    console.log(`events`, wish)
  }
}
