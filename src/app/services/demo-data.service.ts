import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AuthResponse } from "../classes/authresponse";
import { User } from "../classes/user";
import { BROWSER_STORAGE } from "../classes/storage";


@Injectable({
  providedIn: "root",
})
export class DemoDataService {

  private readonly authUrl = environment.authenticationServiceUrl; // API URL for backend

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public login(user: User): Observable<AuthResponse> {
    
    return this.makeAuthApiCall("login", user);
  }
  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }
  private makeAuthApiCall(
    urlPath: string,
    user: User
  ): Observable<AuthResponse> {
    const url: string = `${this.authUrl}/${urlPath}`;
    let body = new HttpParams().set("email", user.email);
    if (user.name) body = body.set("name", user.name);
    if (user.password) body = body.set("password", user.password);
    if (user.type) body = body.set("type", user.type);
    if (user.adminKey) body = body.set("adminKey", user.adminKey);
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http
      .post<AuthResponse>(url, body, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Handle HTTP error
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.log('Client-side error:', error.error.message);
    } else {
      console.error('Server-side error:', error);
      if (error.status === 0) {
        // Network error
        console.error('Network error: Please check your internet connection or the server might be down.');
      }
    }
    return throwError(error);
  }


  /**
   * Uporabnik
   */

  // Get user name by ID
  public getUserNameById(userId: string): Observable<any> {
    return this.http
      .get(`${this.authUrl}/username/${userId}`)
      .pipe(catchError(this.handleError));
  }

}

