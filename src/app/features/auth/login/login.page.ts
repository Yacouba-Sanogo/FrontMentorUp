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
  isLogin = true;
  showPassword = false;

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
      rememberMe: [false]
    });
  }

  toggleAuthMode(mode: boolean) {
    this.isLogin = mode;
    if (!this.isLogin) {
      this.router.navigate(['/auth/register']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

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
          this.router.navigate(['/parrain']);
        } else if (user.role === 'ROLE_SCHOOL') {
          this.router.navigate(['/ecole']);
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

