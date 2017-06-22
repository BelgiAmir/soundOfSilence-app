import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private _sharedSrv: SharedService) {
    _sharedSrv.SetStageTitleAndProgress("ברוכים הבאים", 0);
  }

  ngOnInit() {
  }
  continue() {
    this.router.navigateByUrl('\slides');
  }

  exit() {
    this.router.navigateByUrl('\exitSite');
  }
}
