import { environment } from './../../environments/environment';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})

export class SignComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  departmentName: string = '';
  departmentId: string | number = '';
  departments: any[] = [{ id: 1, department_name: 'Sistemas' }];
  emailValid: boolean = false;

  @Output() propagate = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
    const input = 'email';
    const invalid = 'invalid-email';
    this.hideText([input, invalid]);
    this.getDepartments();
  }

  ngAfterContentChecked(): void {
    const buttonSubmit = document.getElementById('signButton');
    const input = 'email';
    const invalid = 'invalid-email';

    if(this.emailValid) {
      this.hideText([input, invalid]);
    }

    const {
      userName,
      userEmail,
      userPassword,
      departmentId
    } = this;
    if (!userName.length || !userEmail.length || !userPassword.length) {
      buttonSubmit?.setAttribute('disabled', 'true');
      return;
    }

    buttonSubmit?.removeAttribute('disabled');
  }

  async getDepartments() {
    const request = await fetch(`${environment.api}/api/auth/departments`);
    const response = await request.json();
    const { data } = response;

    this.departments = data;
    return data;
  }

  createUser() {
    const data = {
      user_name: this.userName,
      user_email: this.userEmail,
      user_password: this.userPassword,
      department_id: this.departmentId,
    }
    this.sendData(data);
  }

  showText(elements: string[]) {
    const input = document.getElementById(elements[0]);
    const invalid = document.getElementById(elements[1]);
    input?.classList.add('is-invalid');
    invalid?.classList.add('show');
  }

  hideText(elements: string[]) {
    const input = document.getElementById(elements[0]);
    const invalid = document.getElementById(elements[1]);
    input?.classList.remove('is-invalid');
    invalid?.classList.remove('show');
  }

  validateEmail(event: any) {
    const input = 'email';
    const invalid = 'invalid-email';
    const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!event.length) {
      this.hideText([input, invalid]);
      this.emailValid = false;
      return;
    }

    if (!regex.test(event)) {
      this.showText([input, invalid]);
      this.emailValid = false;
    } else {
      this.hideText([input, invalid]);
      this.emailValid = true;
    }
  }

  sendData(data: any) {
    fetch(`${environment.api}/api/auth/users/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.valid) {
          const modalContainer = document.getElementById('modal-container');
          modalContainer?.classList.add('fade-in');
          modalContainer?.classList.add('show');
        }
      });
  }

  hide() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer?.classList.remove('show');
  }

  clearForms() {
    this.userName = '',
    this.userEmail = '',
    this.userPassword = '',
    this.departmentName = '',
    this.departmentId = ''
  }

}