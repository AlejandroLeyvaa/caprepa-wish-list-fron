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

  userName: any = localStorage.getItem('user-name');
  userEmail: any = localStorage.getItem('user-email');
  userPassword: any;
  userImage: string = '';
  userDescription: any = localStorage.getItem('user-description');
  departmentId: string | number = '';
  departmentName: string = '';
  departments: any;
  emailValid: boolean = false;
  submit: boolean = false;
  imageURL: any;
  file: any;
  data: any;
  getUserImageUrl: any = '';
  URL: string = 'https://9109-201-164-62-254.ngrok.io/';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getCurrentUserData();
  }

  ngAfterContentChecked(): void {
    this.data;
    if(this.data) {
      this.data[0].user_name = this.userName;
      this.data[0].user_email = this.userEmail;
      this.data[0].user_description = this.userDescription;
    }
  }

  getImageFromFileInput(event: any) {
    const file = event.target.files[0];
    const imageURL = window.URL.createObjectURL(file);

    this.file = file;

    this.imageURL = this.sanitizer.bypassSecurityTrustUrl(imageURL);
  }

  async getDepartments() {
    const request = await fetch('https://9109-201-164-62-254.ngrok.io/api/auth/departments');
    const response = await request.json();
    const { data } = await response;

    this.departmentId = data[0].department_id;
    this.departmentName = data[0]._department_name;
    
    return data;
  }

  async getCurrentUserData() {
    const userId = localStorage.getItem('user-id');
    const token = localStorage.getItem('token');
    if (userId && token?.length) {
      const URL = `https://9109-201-164-62-254.ngrok.io/api/auth/users/${userId}`;
      const response = await fetch(URL);
      const responseData = await response.json();

      this.data = responseData.data;
      if (responseData.valid) {
        this.getUserImageUrl = this.URL.concat(this.data[0]['user_image']);
      }
    }
  }

  validateEmail(event: any) {

  }

  updateImage() {
    const formData = new FormData();
    const id: any = localStorage.getItem('user-id');

    formData.append('user-image', this.file);
    formData.append('user_id', id);
    this.sendUserImage(formData);
  }

  updateUser() {
    const data = {
      user_id: localStorage.getItem('user-id'),
      user_name: this.userName,
      user_email: this.userEmail,
      user_description: this.userDescription,
      user_password: this.userPassword,
      department_id: this.departmentId,
    }
    this.sendData(data);
  }

  async sendUserImage(formData: any) {
    // const response = await fetch('https://9109-201-164-62-254.ngrok.io/api/auth/users/user-update-image', {
    const response = await fetch('https://9109-201-164-62-254.ngrok.io/api/auth/users/user-update-image', {
      method: 'PUT',
      body: formData,
    });
    const data = await response.json();

  }

  async sendData(dataForm: any) {
    // const response = await fetch('https://9109-201-164-62-254.ngrok.io/api/auth/users/user-update', {
    const response = await fetch('https://9109-201-164-62-254.ngrok.io/api/auth/users/user-update', {
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
    localStorage.setItem('user-name', this.userName);
    localStorage.setItem('user-email', this.userEmail);
    localStorage.setItem('user-description', this.userDescription);
    this.submit = true;
  }

  hide() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer?.classList.remove('show');
  }


}
