import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/model/user.model';
// Pour pouvoir injecter les SVG directement dans le template
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLogin = true; // Pour gérer l'état Se connecter / S'inscrire
  showPassword = false; // Pour afficher/cacher le mot de passe

  // Vagues SVG (pour la sécurité, on utilise DomSanitizer)
  topSvg: SafeHtml;
  bottomSvg: SafeHtml;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private sanitizer: DomSanitizer
  ) {
    // Le code SVG est inséré ici. C'est plus propre que de l'avoir en plein milieu du HTML.
    const topSvgContent = `<svg width="100%" viewBox="0 0 1421 442" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0 140.729C142.561 225.117 345.25 297.562 575.706 338.562C951.669 405.45 1287.13 368.311 1421 258.116V442H0V140.729Z" fill="#02929A" fill-opacity="0.78"/></svg>`;
    const bottomSvgContent = `<svg width="100%" viewBox="0 0 1427 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M663.09 0.116711C665.284 -0.0629154 667.491 -0.0351624 669.68 0.199719L1426.2 81.3775V99.5962H23.6181C-4.87568 99.5962 -8.97664 58.4732 18.956 52.8462L663.09 0.116711Z" fill="#02929A" fill-opacity="0.78"/></svg>`;

    // On dit à Angular que ce code HTML est sûr
    this.topSvg = this.sanitizer.bypassSecurityTrustHtml(topSvgContent);
    this.bottomSvg = this.sanitizer.bypassSecurityTrustHtml(bottomSvgContent);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  // Gère le clic sur les boutons de bascule
  toggleAuthMode(mode: boolean) {
    this.isLogin = mode;
    // Ici, vous changerez le texte du bouton principal et le lien du formulaire
    // Par exemple, si on passe en mode "S'inscrire", le bouton devient "S'inscrire"
    // Pour l'instant, on ne fait que changer le style du toggle.
  }

  // Gère le clic sur l'icône oeil
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    // La logique de soumission reste la même
    if (this.loginForm.invalid) { return; }
    // ... le reste du code est identique
  }
}

