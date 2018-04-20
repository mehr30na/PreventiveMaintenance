import { Component, OnInit } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { AssetService } from '../../../service/asset/asset.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2'


@Component({
  selector: 'item-list-form',
  templateUrl: './item-list-form.component.html',
  styleUrls: ['./item-list-form.component.scss']
})
export class ItemListFormComponent implements OnInit {

  categoryShow: boolean = false;
  operationShow: boolean = false;
  currentId: number;
  files: TreeNode[];

  constructor(private assetService: AssetService,
    private toastr: ToastrService,
    private router: Router, ) { }

  ngOnInit() {
    this.assetService.getAllAssetTreeNode().subscribe((res: TreeNode[]) => {
      this.files = res;
      console.log(res);
    });
  }

  CategorySelect() {
    this.categoryShow = true;
    console.log("Add Item Clicked");
  }

  goToAddItem(categoryId) {
    this.router.navigate(['/item/addAsset'], { queryParams: { categoryId: categoryId } })
  }

  nodeSelect(event) {
    console.log(event.node.data.id);
    this.operationShow = true;
    this.currentId = event.node.data.id;
  }

  goToEditItem() {
    this.router.navigate(['/item/addAsset'], { queryParams: { assetId: this.currentId } })
  }

  deleteItem() {
    let self = this;
    swal({
      title: 'حذف',
      type: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#321834',
      text: 'آیا از حذف اطمینان دارید؟',
      background: '#e4e4e4',
      showCancelButton: true,
      cancelButtonColor: '#321834',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.value) {
        self.assetService.deletAsset(this.currentId).subscribe(res => {
          if (res) {
            self.toastr.success('اطلاعات کالا با موفقیت حذف شد', 'موفق')
          } else {
            self.toastr.error('کالا حذف نشد', 'خطا')
          }
        });
      }
    })

  }

}
