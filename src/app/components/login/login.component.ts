import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { HistoryService } from '../../services/history.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) { }
  protected formError!: string;
  protected credentials: User = {
    email: "",
    password: ""
  };
  public header = {
    title: "Login",
  };
  public onLoginSubmit(): void {
    this.formError = "";
    if (
      !this.credentials.email ||
      !this.credentials.password
    )
      this.formError = "email or password is missing";
    else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.credentials.email
      )
    )
      this.formError = "Not a valid mail";
    else this.doLogin();
  }
  private doLogin(): void {
    this.authenticationService
      .login(this.credentials)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.formError = error.message;
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
          } else if (error.status == 401){
            this.formError = "Napačno uporabniško ime ali geslo."
          } else if (error.status == 404){
            this.formError = error.error.message
          } else if (error.status == 500){
            this.formError = "Napaka na strežniku."
          } else {
            this.formError = "Napaka pri prijavi."}
        }
      });
  }
}
