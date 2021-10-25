import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import {AlertService} from '../alerts/alert.service';
import {CryptService} from '../../services/cryp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = '';
  password = '';
  constructor(private route: Router,
              private service: LoginService,
              private alert: AlertService,
              private cryptService: CryptService) { }

  ngOnInit() {
  }

  login(): void {
    const login: any = {
      userName: this.user,
      password: this.cryptService.encrypt(this.password)
    };
    this.service.login(login).subscribe(data => {
      if (data !== null) {
        this.clean();
        localStorage.setItem('session', JSON.stringify(data));
        this.alert.success('Inicio de Sesión Exitoso', '');
        this.route.navigate(['/avatar']);
      } else {
        this.clean();
        this.alert.error('Usuario o Contraseña Incorrectos', 'Error');
      }
    });
  }

  registrarCuenta() {
    this.route.navigate(['/user']);
  }
  clean(): void {
    this.user = '';
    this.password = '';
  }

}
