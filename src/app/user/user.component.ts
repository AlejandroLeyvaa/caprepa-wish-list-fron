import { Component, OnInit } from '@angular/core';
import {
  DomSanitizer
} from '@angular/platform-browser';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  userImage: string = '';
  departmentId: string | number = '';
  responseData: any;
  departments: any[] = [{ id: 1, department_name: 'Sistemas' }];
  emailValid: boolean = false;
  submit: boolean = false;
  imageURL: any;
  file: any;
  data: any;
  getUserImageUrl: any = '';
  URL: string = 'http://localhost:3000/';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getCurrentUserData();
  }

  ngAfterContentChecked(): void {
    this.data;
  }

  getImageFromFileInput(event: any) {
    const file = event.target.files[0];
    const imageURL = window.URL.createObjectURL(file);

    this.file = file;
    
    this.imageURL = this.sanitizer.bypassSecurityTrustUrl(imageURL);
  }

  async getDepartments() {
    const request = await fetch('http://localhost:3000/api/auth/departments');
    const response = await request.json();
    const { data } = await response;

    this.departments = data;
    return data;
  }

  async getCurrentUserData() {
    const userId = sessionStorage.getItem('user-id');
    const token = localStorage.getItem('token');
    if(userId && token?.length) {
      const URL  = `http://localhost:3000/api/auth/users/${userId}`;
      const response = await fetch(URL);
      const {data} = await response.json();

      // this.responseData = responseData
      this.data = data;
      this.getUserImageUrl = this.URL.concat(this.data[0]['user_image']);
    }
  }

  validateEmail(event: any) {

  }

  updateImage() {
    const formData = new FormData();
    const id: any = sessionStorage.getItem('user-id'); 

    formData.append('user-image', this.file);
    formData.append('user_id', id);
    this.sendUserImage(formData);
  }

  updateUser() {
    const data = {
      user_id: sessionStorage.getItem('user-id'),
      user_name: this.userName || sessionStorage.getItem('user-name'),
      user_email: this.userEmail || sessionStorage.getItem('user-email'),
      user_password: this.userPassword || sessionStorage.getItem('user-password'), 
      department_id: this.departmentId || '1',
    }

    console.log(`data session`, data)
    this.sendData(data);
  }

  async sendUserImage(formData: any) {
    const response = await fetch('http://localhost:3000/api/auth/users/user-update-image', {
      method: 'PUT',
      body: formData,
    });
    const data = await response.json();

  }

  async sendData(dataForm: any) {
    const response = await fetch('http://localhost:3000/api/auth/users/user-update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm),
    });
    const data = await response.json();

    if (data.valid) {
      const modalContainer = document.getElementById('modal-container');
      modalContainer?.classList.add('fade-in');
      modalContainer?.classList.add('show');
    }
    sessionStorage.setItem('user-name', this.userName)
    sessionStorage.setItem('user-email', this.userEmail)
    this.submit = true;
  }

  hide() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer?.classList.remove('show');
  }


}
