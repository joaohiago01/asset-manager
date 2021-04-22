import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserNotFoundException } from 'src/app/shared/errors/user-not-found-exception';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public isLogged: boolean = false;

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login(event: Event, username: string, password: string) {
    event.preventDefault();
    let user = this.authenticationService.login(username, password);
    if (!user) throw new UserNotFoundException();
    this.isLogged = true;
    this.router.navigate(['dashboard']);
  }

}
