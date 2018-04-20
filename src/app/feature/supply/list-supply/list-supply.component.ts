import { Component, OnInit } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PartService } from '../../../service/partAndSupply/part.service';

@Component({
  selector: 'list-supply',
  templateUrl: './list-supply.component.html',
  styleUrls: ['./list-supply.component.scss']
})
export class ListSupplyComponent implements OnInit {

  files: TreeNode[];
  partId:number;

  constructor(private toastr: ToastrService,
    private partService: PartService,
    private router: Router, ) { }

  ngOnInit() {
    this.partService.getAllPartTreeNode().subscribe((res: TreeNode[]) => {
      this.files = res;
      console.log(res);
    });
  }

  nodeSelect(event){
    console.log(event.node.data.id);
    this.partId = event.node.data.id;
  }

  goToAddPart() {
    this.router.navigate(['/part/addSupply']);
  }

  goToPart(partId){
    this.router.navigate(['/part/addSupply'], { queryParams: { partId: this.partId } })
  }

}
