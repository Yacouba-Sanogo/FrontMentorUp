import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLogin = true; // Pour gérer l'onglet actif
  showPassword = false; // Pour la visibilité du mot de passe

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // Initialise le formulaire avec les champs correspondants à votre HTML
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  // Gère la navigation et l'état des onglets
  toggleAuthMode(mode: boolean) {
    this.isLogin = mode;
    if (!this.isLogin) {
      // Si l'utilisateur clique sur "S'inscrire", on navigue
      this.router.navigate(['/auth/register']);
    }
  }

  // Affiche ou cache le mot de passe
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Logique de soumission du formulaire (inchangée)
  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({ message: 'Connexion...', });
    await loading.present();

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user: User) => {
        loading.dismiss();
        if (user.role === 'ROLE_PARRAIN') {
          this.router.navigate(['/parrain/dashboard']);
        } else if (user.role === 'ROLE_SCHOOL') {
          this.router.navigate(['/ecole/dashboard']);
        }
      },
      error: (err: any) => {
        loading.dismiss();
        this.presentToast('Email ou mot de passe incorrect.', 'danger');
      }
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}

