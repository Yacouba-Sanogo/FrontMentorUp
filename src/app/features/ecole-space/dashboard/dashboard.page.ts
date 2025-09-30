import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
// ERREUR CORRIGÉE ICI :
// J'importe les types 'Color' et 'ScaleType' pour définir correctement
// le schéma de couleurs du graphique.
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, NgxChartsModule]
})
export class DashboardPage implements OnInit {

  public appPages = [
    { title: 'Accueil', url: '/ecole/dashboard', icon: 'home' },
    { title: 'Liste des élèves', url: '#', icon: 'people' },
    { title: 'Liste de parrains', url: '#', icon: 'ribbon' },
    { title: 'Dépenses faites', url: '#', icon: 'wallet' },
  ];

  public statCards = [
    { title: "Nombre total d'élèves parrainés", value: "10", icon: "people-circle-outline" },
    { title: "Nombre total de fonds reçus / mois", value: "150 000 Fcfa", icon: "cash-outline" },
    { title: "Fonds encore disponible", value: "10 000 Fcfa", icon: "wallet-outline" },
    { title: "Nombre de rapports trimestriels générés", value: "30", icon: "document-text-outline" },
    { title: "Besoins en attente", value: "100 000 Fcfa", icon: "hourglass-outline" },
    { title: "Les activités organisées", value: "10", icon: "calendar-outline" }
  ];

  public actionCards = [
    { title: "Faire une demande de parrainage", icon: "person-add-outline" },
    { title: "Faire une demande de transfert de fonds", icon: "swap-horizontal-outline" },
    { title: "Dépenses récentes", value: "5", icon: "receipt-outline" },
    { title: "Photos des activités", value: "9", icon: "images-outline" }
  ];

  public chartData = [
    { name: "Scolarité", value: 55 },
    { name: "Cantine", value: 45 },
    { name: "Uniforme", value: 40 },
    { name: "Transport", value: 30 },
    { name: "Autre", value: 25 },
  ];
  
  public view: [number, number] = [0, 300];

  // ERREUR CORRIGÉE ICI :
  // L'erreur "is not assignable to type 'string | Color'" est résolue en
  // donnant un type explicite à notre objet de couleurs.
  public colorScheme: Color = {
    name: 'mentorupScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#02929a', '#037F85', '#3B82F6', '#60A5FA', '#93C5FD']
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  logout(): void {
    this.authService.logout();
  }
}

