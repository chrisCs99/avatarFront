import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../alerts/alert.service';
import {AvatarService} from '../../services/avatar.service';
import {Feature} from '../../interfaces/feature.interface';
import {Avatar} from '../../interfaces/avatar.interface';
import {DisplayAvatar} from '../../interfaces/displayAvatar.interface';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  head = 'cabello1.png';
  mouth = 'boca1.png';
  eye = 'ojos1.png';
  skinColor = 'piel1.png';
  headId = 0;
  mouthId = 0;
  eyeId = 0;
  skinColorId = 0;

  heads: Array<Feature> = [];
  mouths: Array<Feature> = [];
  eyes: Array<Feature> = [];
  skinsColor: Array<Feature> = [];
  creations: Array<DisplayAvatar> = [];

  constructor(private route: Router, private alert: AlertService,
              private service: AvatarService) { }

  ngOnInit() {
    this.getAllFeatures();
    this.getAllCreations();
  }


  setCabello(value: any): void {
    this.head = value;
    for (const val of this.heads) {
      if (val.imagePath === value) {
        this.headId = val.id;
      }
    }
  }

  setMouth(value: any): void {
    this.mouth = value;
    for (const val of this.mouths) {
      if (val.imagePath === value) {
        this.mouthId = val.id;
      }
    }
  }

  setEye(value: any): void {
    this.eye = value;
    for (const val of this.eyes) {
      if (val.imagePath === value) {
        this.eyeId = val.id;
      }
    }
  }

  setColor(value: any): void {
    this.skinColor = value;
    for (const val of this.skinsColor) {
      if (val.imagePath === value) {
        this.skinColorId = val.id;
      }
    }
  }

  resetAll(): void {
    this.head = 'cabello1.png';
    this.mouth = 'boca1.png';
    this.eye = 'ojos1.png';
    this.skinColor = 'piel1.png';
  }

  logout(): void {
    localStorage.removeItem('session');
    this.route.navigate(['']);
  }

  getAllFeatures(): void {
    this.service.getAll().subscribe(data => {
      if (data.length > 0) {
        for (const val of data) {
          if (val.category === 1) {
            this.eyes.push(val);
          } else if (val.category === 2) {
            this.heads.push(val);
          } else if (val.category === 3) {
            this.mouths.push(val);
          } else if (val.category === 4) {
            this.skinsColor.push(val);
          }
        }
      }
    });
  }

  getAllCreations(): void {
    this.service.getAllCreations().subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        this.creations = data;
      }
    });
  }

  createAvatar(): void {
    const usr: any = JSON.parse(localStorage.getItem('session'));
    const avatar: Avatar = {
      colorSkin: this.skinColorId,
      userId: usr.id,
      head: this.headId,
      eye: this.eyeId,
      mouth: this.mouthId
    };
    this.service.createAvatar(avatar).subscribe(data => {
      if (data !== null) {
        this.resetAll();
        this.alert.success('Registro exitoso', 'Felicidades');
        window.location.reload();
      } else {
        this.alert.error('Error al crear el registro', 'Error');
        this.resetAll();
      }
    });
  }
  utilizar(n1: string, n2: string, n3: string, n4: string): void {
    this.head = n1;
    this.mouth = n2;
    this.eye = n3;
    this.skinColor = n4;
  }

}
