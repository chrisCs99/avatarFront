import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptService } from 'src/app/services/cryp.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user.interface';
import {AlertService} from '../alerts/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  name = '';
  email = '';
  userName = '';
  password = '';
  lastName = '';

  constructor(private cryptService: CryptService,
              private service: UserService,
              private router: Router,
              private alert: AlertService) { }

  ngOnInit() {
  }

  register(): void {
    const user: User = {
      id: 0,
      name: this.name,
      userName: this.userName,
      email: this.email,
      lastName: this.lastName,
      password: this.cryptService.encrypt(this.password)
    };

    this.service.register(user).subscribe(data => {
      if (data !== null) {
        this.alert.success('Usuario registrado exitosamente', 'Registro completado');
        this.clean();
        this.router.navigate(['']);
      } else {
        this.alert.error('Fallo al Registrar al  Usuario', 'Registro fallido');
        this.clean();
      }
    });
  }

  clean(): void {
    this.name = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.userName = '';
  }
  backToLogin(): void {
    this.router.navigate(['']);
  }
}
