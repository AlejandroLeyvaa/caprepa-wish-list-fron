import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
    
  @Output() propagate = new EventEmitter();
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    const buttonSubmit = document.getElementById('loginButton');

    const {
      // userName,
      userEmail,
      userPassword,
    } = this;
    if(!userEmail.length || !userPassword.length) {
      buttonSubmit?.setAttribute('disabled', 'true');
      return;
    }

    buttonSubmit?.removeAttribute('disabled');
  }

  createUser() {
    const data = {
      user_name: this.userName,
      user_email: this.userEmail,
      user_password: this.userPassword,
    }
    this.sendData(data);
  }

  sendData(data: any) {
    fetch(`https://3cf1-187-149-136-216.ngrok.io/api/auth/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type'
        : 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {

        localStorage.setItem('token', data.token);
        localStorage.setItem('user-name', this.userName);
        localStorage.setItem('user-email', this.userEmail);
        localStorage.setItem('user-id', data.data.user_id);

        if(data.token) {
          this.router.navigate(['/create-wish-list'])
        }
      });
  }
}
