import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() message: string = '';
  @Input() isCreated: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer?.classList.add('fade-in');
    modalContainer?.classList.add('show');
  }

  hide() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer?.classList.remove('show');
  }


}
