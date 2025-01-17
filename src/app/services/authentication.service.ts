import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { DemoDataService } from "./demo-data.service";
import { BROWSER_STORAGE } from "../classes/storage";
import { User } from "../classes/user";
import { AuthResponse } from "../classes/authresponse";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private readonly storage: Storage,
    private readonly demoDataService: DemoDataService
  ) { }
  public login(user: User, tenant: string): Observable<AuthResponse> {
    return this.demoDataService.login(user, tenant).pipe(
      tap((authResponse: AuthResponse) => {
        this.saveToken(authResponse.token, tenant);
      })
    );
  }
  public register(user: User, tenant: string): Observable<AuthResponse> {
    return this.demoDataService.register(user, tenant).pipe(
      tap((authResponse: AuthResponse) => {
        this.saveToken(authResponse.token, tenant);
      })
    );
  }
  public logout(tenant: string): void {
    this.storage.removeItem(`macje-token-${tenant}`);
  }
  public getToken(tenant: string): string | null {
    return this.storage.getItem(`macje-token-${tenant}`);
  }
  public saveToken(token: string, tenant: string): void {
    this.storage.setItem(`macje-token-${tenant}`, token);
  }
  private b64Utf8(input: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(window.atob(input), (character: string) => {
          return "%" + ("00" + character.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }

  public isLoggedIn(tenant: string): boolean {
    const token: string | null = this.getToken(tenant);
    if (token) {
      const payload = JSON.parse(this.b64Utf8(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } else return false;
  }
  public getCurrentUser(tenant: string): User {
    let user: User = new User();
    if (this.isLoggedIn(tenant)) {
      let token: string | null = this.getToken(tenant);
      if (token) {
        const payload = JSON.parse(this.b64Utf8(token.split(".")[1]));
        let { _id, id, email, name, type} = payload;
        user = { _id: _id, id: id, email: email, name: name, type: type };
      }
    }
    return user;
  }

}
