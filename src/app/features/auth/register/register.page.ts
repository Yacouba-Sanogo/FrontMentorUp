import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
// Pas besoin d'importer AuthService ici pour le moment, sauf si on y ajoute une méthode register()

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Validateur custom pour vérifier que les mots de passe correspondent
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      // Affiche une erreur si les mots de passe ne correspondent pas
      if(this.registerForm.errors?.['mismatch']) {
        this.presentToast('Les mots de passe ne correspondent pas.', 'danger');
      } else {
        this.presentToast('Veuillez remplir tous les champs correctement.', 'warning');
      }
      return;
    }

    const loading = await this.loadingController.create({ message: 'Création du compte...', });
    await loading.present();

    console.log('Données du formulaire:', this.registerForm.value);

    // TODO: Appeler le service d'authentification pour créer le compte
    setTimeout(() => {
      loading.dismiss();
      this.presentToast('Compte créé avec succès !', 'success');
      this.router.navigate(['/auth/login']);
    }, 1500);
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
