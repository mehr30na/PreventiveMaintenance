import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../../../service/management/userManagement/user.service";
import { User } from "../../../../../model/management/userManagement/user";
import { Contact } from "../../../../../model/contact";
import { Config } from "../../../../../configuration/config";
import { Organization } from "../../../../../model/baseInformation/organization";
import { UserType } from "../../../../../model/management/userManagement/userType";
import { Image } from "../../../../../model/Image";
import { ImageService } from "../../../../../service/management/userManagement/image.service";
declare let $: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, AfterViewInit {
  userId: number;
  user: User = new User();
  // image:Image=new Image();
  image: string;

  constructor(private route: ActivatedRoute,
    private imageService: ImageService,
    private userService: UserService) {
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $(".btn-pref .btn").click(function () {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below 
        $(this).removeClass("btn-default").addClass("btn-primary");
      });
    });
  }

  
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.userService.getUserById(this.userId).subscribe((res: User) => {
      this.user = res;
      // console.log(this.user);
      if (this.user.userContact == null) {
        this.user.userContact = new Contact();
      }
      if (this.user.organization == null) {
        this.user.organization = new Organization();
      }
      if (this.user.userType == null) {
        this.user.userType = new UserType();
      }
      if (this.user.image) {
        this.image = Config.getUrl()+this.user.image.imageData;
        
      }
      // this.image=Config.getUrl()+'download/user/'+res.id
      // this.imageService.getImage(this.user.id).subscribe((res)=>{
      //   if(res){
      //     alert(res);
      //     this.image=res;
      //   }
      // })
    })

  }

}
