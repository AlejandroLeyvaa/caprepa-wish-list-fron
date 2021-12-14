import { Component, OnInit } from '@angular/core';
 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  wishList: any[] = [];
  URL: string = `https://3cf1-187-149-136-216.ngrok.io/`;
  constructor() { }

  ngOnInit(): void {
    this.getWishListOfAllUsers();
  }

  async getWishListOfAllUsers(): Promise<any> {
    const URL = `https://3cf1-187-149-136-216.ngrok.io/api/wish-list/users-wish-list`;
    const response = await fetch(URL);
    const { data } = await response.json();

    this.wishList = data;

    console.log('this.wishList :>> ', this.wishList.sort((a, b) => a.user_id - b.user_id));

    return data;
  }

  edit(wish: any) {
    console.log(`events`, wish)
  }
}
