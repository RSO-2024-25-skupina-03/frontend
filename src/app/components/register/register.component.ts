import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { User } from '../../classes/user';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HistoryService } from '../../services/history.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  tenant: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
) {
  this.tenant = this.router.url.split('/')[1];
  console.log('tenant:', this.tenant);
}

protected formError!: string;
protected credentials: User = {
  name: "",
  email: "",
  password: "",
  type: "user",
  adminKey: ""
};
protected confirmPassword: string = "";

public header = {
  title: "Register"
}
public onRegisterSubmit() {
  this.formError = "";
  if (
      !this.credentials.name ||
      !this.credentials.email ||
      !this.credentials.password
  )
    this.formError = "Name or email or password is missing";
  else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.credentials.email
      )
  )
    this.formError = "Email is not valid";
  else if (this.credentials.password !== this.confirmPassword)
    this.formError = "Passwords do not match";
  else if (this.credentials.type === "admin" && !this.credentials.adminKey)
    this.formError = "Admin key is missing";
  else this.doRegister();
}
private doRegister() {
  this.authenticationService
      .register(this.credentials, this.tenant)
      .pipe(
          catchError((error: HttpErrorResponse) => {
            this.formError = error.message.toString();
            console.log(error);
            return throwError(() => error);
          })
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.historyService.getPreviousUrl());
        },
        error: (error) => {
          console.error('registration error:', error);
          if(error.status === 409) {
            this.formError = "Uporabnik s tem email naslovom že obstaja."
          } else if (error.status == 0){
            this.formError = "Napaka pri povezavi s strežnikom."
          } else if (error.error?.message){
            this.formError = error.error.message
          }
        }
      });
}
}
