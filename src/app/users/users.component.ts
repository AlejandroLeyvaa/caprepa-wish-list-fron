import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  wishList: any[] = [];
  URL: string = 'http://localhost:3000/';
  constructor() { }

  ngOnInit(): void {
    this.getWishListOfAllUsers();
  }

  async getWishListOfAllUsers(): Promise<any> {
    const URL  = 'https://serene-springs-53935.herokuapp.com/api/wish-list/users-wish-list';
    const response = await fetch(URL);
    const { data } = await response.json();
    
    this.wishList = data;
    return data;
  }
}
