/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {Title} from "@angular/platform-browser";
import {Config} from "./configuration/config";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.titleService.setTitle('تعمیر و نگهداری');
    // Config.clearLocalStorageToken()
    if (Config.getLocalStorageUserType() == null) {
      Config.setLocalStorageUserType("USER")
    }

  }
}
