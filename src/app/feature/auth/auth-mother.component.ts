import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-mother',
  template: '<router-outlet></router-outlet>',

})
export class AuthMotherComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    // this.router.navigateByUrl('/signIn');
  }

}
