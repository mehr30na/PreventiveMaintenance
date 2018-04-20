import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Config} from "../../configuration/config";
import {NbThemeService} from "@nebular/theme";
import {ChartModel} from "../../model/chartModel";
import {CategoryService} from "../../service/baseInformation/category.service";
import { TicketService } from '../../service/chat/ticket.service';
import { NetService } from '../../service/net/net.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  categoryNumber: Array<ChartModel> = [];
  categoryLabel: Array<string> = [];
  go: boolean = false;

  ticketNumber: Array<ChartModel> = [];
  categoryTicketLabel: Array<string> = [];
  go1: boolean = false;

  ticketNumberOrgan: Array<ChartModel> = [];
  organLabel: Array<string> = [];
  go2: boolean = false;

  netNumberOrgan: Array<ChartModel> = [];
  organLabelNet: Array<string> = [];
  go3: boolean = false;

  netNumberExpert: Array<ChartModel> = [];
  expertLabelNet: Array<string> = [];
  go4: boolean = false;
  constructor(private router: Router,
              private ticketService:TicketService,
              private netService:NetService,
              private categoryService: CategoryService) {


  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    // alert(JSON.stringify(Config.getLocalStorageUserType()))
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      this.categoryService.getChartItemPerCategory(Config.getLocalStorageUser().organization.id).subscribe((res: ChartModel[]) => {
        if (res) {
          this.categoryNumber = res;
          // console.log(res);
          for (let item of this.categoryNumber) {
            this.categoryLabel.push(item.name);
            this.go = true;
          }
        }
      });
      this.ticketService.getChartTicketPerCategory().subscribe((res: ChartModel[]) => {
        if (res) {
          this.ticketNumber = res;
          for (let item of this.ticketNumber) {
            this.categoryTicketLabel.push(item.name);
            this.go1 = true;
          }
        }
      });
      this.ticketService.getChartTicketPerOrganization().subscribe((res: ChartModel[]) => {
        if (res) {
          this.ticketNumberOrgan = res;
          for (let item of this.ticketNumberOrgan) {
            this.organLabel.push(item.name);
            this.go2 = true;
          }
        }
      });
      this.netService.getChartNetPerOrganization().subscribe((res:ChartModel[])=>{
        if(res){
          this.netNumberOrgan=res;
          for (let item of this.netNumberOrgan) {
            this.organLabelNet.push(item.name);
            this.go3 = true;
          }
        }
      })
      this.netService.getChartNetPerExpert().subscribe((res:ChartModel[])=>{
        if(res){
          this.netNumberExpert=res;
          for (let item of this.netNumberExpert) {
            this.expertLabelNet.push(item.name);
            this.go4 = true;
          }
        }
      })
      // console.log("mdksajdksda",this.categoryNumber)
    }
    // alert(2)
    // // Config.clearLocalStorageToken()
    // if (Config.getLocalStorageToken()==null) {
    //   this.router.navigateByUrl('/authentication/signIn');
    // }else{
    //   this.categoryService.getChartItemPerCategory(Config.getLocalStorageUser().organization.id).subscribe((res:ChartModel[])=>{
    //     this.categoryNumber=res;
    //     console.log(this.categoryNumber);
    //     for(let item of this.categoryNumber){
    //       this.categoryLabel.push(item.name);
    //     }
    //   });

    // console.log("mdksajdksda",this.categoryNumber)
    // }
  }
}
