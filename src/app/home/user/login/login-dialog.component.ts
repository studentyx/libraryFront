import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['login-dialog.component.css']
})

export class LoginComponent {

  usuario: string = 'diego';
  password: string = 'diego';
  passwordFormControl: FormControl;
  userFormControl: FormControl;

  loginForm: FormGroup = new FormGroup({
    usuario: this.userFormControl = new FormControl('', [Validators.required]),
    password: this.passwordFormControl = new FormControl('', [Validators.required])
  });

  constructor(private router: Router, 
    private userService: UserService, 
    public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  login() {
    this.userService.login(this.usuario, this.password).subscribe(
      exito => {
        if (exito) {
          if (this.data != null) {
            this.router.navigate(['home/libraryBooks', this.data.idRoom]);
          }
        } else {
          this.showErrorAuthentication();
        }

      },
      error => {
        this.showErrorServer();
      }

    );
  }

  showErrorAuthentication(): void {
    this.snackBar.open("Autenticacion fallida", 'Error', {
      duration: 8000
    });
  }

  showErrorServer(): void {
    this.snackBar.open("Error de conexion con el servidor", 'Error', {
      duration: 8000
    });
  }
}
