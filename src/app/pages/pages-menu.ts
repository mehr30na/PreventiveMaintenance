import {NbMenuItem} from '@nebular/theme';
import {Config} from "../configuration/config";

export const MENU_ITEMS: Array<NbMenuItem> = [];

// if(Config.getLocalStorageToken()!==null){
if (Config.getLocalStorageUserType() == 'ADMIN') {
  this.MENU_ITEMS = [
    {
      icon: 'nb-home',
      title: 'صفحه اصلی',
      link: '/pages/dashboard',
      home: true,
    },
    // {
    //   name: 'لاگین',
    //   icon: 'nb-locked',
    //   link: '/authentication/signIn',
    //   home: true,
    // },
    // {
    //   name: 'مدیریت',
    //   group: true,
    // },

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
      icon: 'ion-ios-download-outline',
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
    // {
    //   name: 'اطلاعات پایه',
    //   group: true,
    // },
    {
      title: 'اطلاعات پایه',
      icon: 'ion-ios-information-outline',
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
    // {
    //   name: 'مدیریت کالا',
    //   group: true,
    // },
    {
      title: 'مدیریت دارایی',
      icon: 'ion-social-dropbox-outline',
      children: [
        {
          title: 'لیست دارایی ها',
          link: '/item/listAsset'
        },

      ]
    },
    {
      title: 'مدیریت قطعات ',
      icon: 'ion-social-dropbox-outline',
      children: [
        {
          title: 'لیست قطعات',
          link: '/part/listSupply'
        },
        {
          title: 'قطعات',
          link: '/part/addSupply'
        },
      ]
    },
    {
      title: 'مدیریت درخواست ها',
      icon: 'ion-social-dropbox-outline',
      children: [
        {
          title: 'لیست درخواست ها',
          link: '/workOrder/listWorkOrder'
        },
        {
          title: 'ثبت در خواست',
          link: '/workOrder/addWorkOrder'
        },
      ]
    },
    // {
    //   name: 'پشتیبانی',
    //   group: true,
    // },
    {
      title: 'تیکت',
      icon: 'ion-ios-people-outline',
      children: [
        {
          title: 'درخواست تیکت',
          link: '/ticket/addTicket'
        },
        // {
        //   name: 'اختصاص کارشناس',
        //   link: '/ticket/expert-allocate'
        // },
        {
          title: 'نت',
          link: '/net/addNet'
        },
        {
          title: 'تیکت های من',
          link: '/ticket/myTicket'
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
    // {
    //   name: 'لاگین',
    //   icon: 'nb-locked',
    //   link: '/authentication/signIn',
    //   home: true,
    // },
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
    // {
    //   name: 'مدیریت کالا',
    //   group: true,
    // },
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

    // {
    //   name: 'پشتیبانی',
    //   group: true,
    // },
    {
      title: 'تیکت',
      icon: 'ion-ios-people-outline',
      children: [
        {
          title: 'درخواست تیکت',
          link: '/ticket/addTicket'
        },
        {
          title: 'نت',
          link: '/net/addNet'
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
    // {
    //   name: 'لاگین',
    //   icon: 'nb-locked',
    //   link: '/authentication/signIn',
    //   home: true,
    // },
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
    // {
    //   name: 'پشتیبانی',
    //   group: true,
    // },
    {
      title: 'تیکت',
      icon: 'ion-ios-people-outline',
      children: [
        {
          title: 'درخواست تیکت',
          link: '/ticket/addTicket'
        },
      ]
    },
  ];
}


// }
