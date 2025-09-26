import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule],
  // Cette ligne est la clé pour que votre design personnalisé fonctionne
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isPasswordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.presentToast('Veuillez vérifier les champs saisis.', 'warning');
      return;
    }
    const loading = await this.loadingController.create({ message: 'Connexion...' });
    await loading.present();

    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      next: (user: User) => {
        loading.dismiss();
        if (user.role === 'ROLE_PARRAIN') this.router.navigate(['/parrain/dashboard']);
        else if (user.role === 'ROLE_SCHOOL') this.router.navigate(['/ecole/dashboard']);
      },
      error: () => {
        loading.dismiss();
        this.presentToast('Email ou mot de passe incorrect.', 'danger');
      }
    });
  }

  async presentToast(message: string, color: 'warning' | 'danger') {
    const toast = await this.toastController.create({ message, duration: 3000, color, position: 'top' });
    toast.present();
  }
}

