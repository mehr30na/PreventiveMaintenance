import { Component, OnInit } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WorkOrderService } from '../../../service/workOrder/work-order.service';

@Component({
  selector: 'list-work-order',
  templateUrl: './list-work-order.component.html',
  styleUrls: ['./list-work-order.component.scss']
})
export class ListWorkOrderComponent implements OnInit {

  files: TreeNode[];

  constructor(private toastr: ToastrService,
    private workOrderService: WorkOrderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.workOrderService.getAllWorkOrderTreeNode().subscribe((res: TreeNode[]) => {
      this.files = res;
      console.log(res);
    });
  }

  goToAddWO() {
    this.router.navigate(['/workOrder/addWorkOrder']);
  }

  nodeSelect(){
    
  }

}
