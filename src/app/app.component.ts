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
  items: Observable<any[]>;
  title = 'Angular Lab #1';

  constructor(private db: AngularFireDatabase) {
  }
  ngOnInit() {
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    console.log(event.keyCode)
    if (event.keyCode === 32) {
      this.getProfile();
    }
  }
  getProfile() {
  this.items = this.db.list('users').valueChanges()
    .pipe(map(pickRandomItem));
  }
}
function pickRandomItem(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
