import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-depenses-add',
  templateUrl: './depenses-add.page.html',
  styleUrls: ['./depenses-add.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DepensesAddPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
