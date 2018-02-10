import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
//Import firebase dependencies
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Lab #1';
  // items: Observable<any[]>;
  age: number;
  email: string;
  gender: string;
  name: string;
  phone: string;
  photo: string;
  region: string;
  surname:string;
  visible = false;

  constructor(private db: AngularFireDatabase) {
  }
  ngOnInit() {
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      this.getProfile();
    }
  }
  getProfile() {
    this.visible = false;
    this.db.list('users').valueChanges()
      .pipe(map(pickRandomItem)).subscribe(value => {
        this.age = value.age;
        this.email = value.email;
        this.gender = value.gender;
        this.name = value.name;
        this.phone = value.phone;
        this.photo = value.photo;
        this.region = value.region;
        this.surname = value.surname;
        this.visible = true;
      });;
  }
}
function pickRandomItem(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
