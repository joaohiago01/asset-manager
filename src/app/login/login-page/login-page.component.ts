import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserNotFoundException } from 'src/app/shared/errors/user-not-found-exception';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public authenticationService: AuthenticationService,
    public utilityService: UtilityService,
    ) { }

  ngOnInit(): void { }

  async login(event: Event, username: string, password: string) {
    event.preventDefault();

    try {
      let user = await this.authenticationService.login(username, password);
      if (!user) throw new UserNotFoundException();
      this.router.navigate(['dashboard']);
    } catch (error) {
      this.utilityService.showNotification('Não foi possível acessar! Verifique se o usuário e a senha estão corretos');

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 5000);
    }
    
  }

}
