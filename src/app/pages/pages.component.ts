import {Component, OnInit} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {Config} from "../configuration/config";
import {NbMenuItem} from "@nebular/theme";

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <router-outlet></router-outlet>
      <nb-menu [items]="menu"></nb-menu>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  MENU_ITEMS: Array<NbMenuItem> = [];
  menu = MENU_ITEMS;

  ngOnInit() {
    // alert(2);
    if (Config.getLocalStorageUserType() == 'ADMIN') {
      this.MENU_ITEMS = [
        {
          icon: 'nb-home',
          title: 'Dashboard',
          link: '/pages/dashboard',
          home: true,
        },
        {
          title: 'لاگین',
          icon: 'nb-locked',
          link: '/authentication/signIn',
          home: true,
        },
        {
          title: 'مدیریت',
          group: true,
        },

        {
          title: 'مدیریت کاربری',
          icon: 'nb-person',
          children: [
            {
              title: 'کاربران',
              link: '/management/userManagement/listUser'
            },
            {
              title: 'نقش',
              link: '/management/userManagement/listRole',
            }
          ]
        },
        {
          title: 'مدیریت انبار',
          icon: 'nb-roller-shades',
          children: [
            {
              title: 'قطعه یدکی',
              link: '/management/storeManagement/addSpare'
            },
            {
              title: 'منبع خرید',
              link: '/management/storeManagement/addPurchasingResources'
            },
            {
              title: 'سازنده',
              link: '/management/storeManagement/addCollector'
            },

          ]
        },
        {
          title: 'اطلاعات پایه',
          group: true,
        },
        {
          title: 'اطلاعات پایه',
          icon: 'nb-keypad',
          children: [
            {
              title: 'استان',
              link: '/baseInformation/listProvince'
            },
            {
              title: 'شهر',
              link: '/baseInformation/listCity'
            },
            {
              title: 'سازمان',
              link: '/baseInformation/listOrganization'
            },
            {
              title: 'دسته بندی',
              link: '/baseInformation/listCategory'
            },
            {
              title: 'واحد اندازه گیری',
              link: '/baseInformation/listMeasurement'
            },


          ]
        },
        {
          title: 'مدیریت کالا',
          group: true,
        },
        {
          title: 'مدیریت کالا',
          icon: 'nb-keypad',
          children: [
            {
              title: 'کالا',
              link: '/item/addItem'
            },
          ]
        },

        {
          title: 'پشتیبانی',
          group: true,
        },
        {
          title: 'تیکت',
          icon: 'nb-keypad',
          children: [
            {
              title: 'درخواست تیکت',
              link: '/ticket/addTicket'
            },
          ]
        },
      ];
    } else if (Config.getLocalStorageUserType() == 'USER') {
      this.MENU_ITEMS = [
        {
          icon: 'nb-home',
          title: 'Dashboard',
          link: '/pages/dashboard',
          home: true,
        },
        {
          title: 'لاگین',
          icon: 'nb-locked',
          link: '/authentication/signIn',
          home: true,
        },
        {
          title: 'مدیریت انبار',
          icon: 'nb-roller-shades',
          children: [
            {
              title: 'قطعه یدکی',
              link: '/management/storeManagement/addSpare'
            },
            {
              title: 'منبع خرید',
              link: '/management/storeManagement/addPurchasingResources'
            },
            {
              title: 'سازنده',
              link: '/management/storeManagement/addCollector'
            },

          ]
        },
        {
          title: 'مدیریت کالا',
          group: true,
        },
        {
          title: 'مدیریت کالا',
          icon: 'nb-keypad',
          children: [
            {
              title: 'کالا',
              link: '/item/addItem'
            },
          ]
        },

        {
          title: 'پشتیبانی',
          group: true,
        },
        {
          title: 'تیکت',
          icon: 'nb-keypad',
          children: [
            {
              title: 'درخواست تیکت',
              link: '/ticket/addTicket'
            },
          ]
        },
      ];
    } else if (Config.getLocalStorageUserType() == 'EXPERT') {
      this.MENU_ITEMS = [
        {
          icon: 'nb-home',
          title: 'Dashboard',
          link: '/pages/dashboard',
          home: true,
        },
        {
          title: 'لاگین',
          icon: 'nb-locked',
          link: '/authentication/signIn',
          home: true,
        },
        {
          title: 'مدیریت انبار',
          icon: 'nb-roller-shades',
          children: [
            {
              title: 'قطعه یدکی',
              link: '/management/storeManagement/addSpare'
            },
            {
              title: 'منبع خرید',
              link: '/management/storeManagement/addPurchasingResources'
            },
            {
              title: 'سازنده',
              link: '/management/storeManagement/addCollector'
            },

          ]
        },
        {
          title: 'پشتیبانی',
          group: true,
        },
        {
          title: 'تیکت',
          icon: 'nb-keypad',
          children: [
            {
              title: 'درخواست تیکت',
              link: '/ticket/addTicket'
            },
          ]
        },
      ];
    }

  }
}
