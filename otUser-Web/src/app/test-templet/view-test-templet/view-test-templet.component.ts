import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-test-templet',
  templateUrl: './view-test-templet.component.html',
  styleUrls: ['./view-test-templet.component.scss']
})
export class ViewTestTempletComponent implements OnInit {

  constructor(private http:HttpService,private toastr: ToastrService) { }
public testInfo = [];
  ngOnInit() {
    this.http.get('testTemplet/findTestTemplet').subscribe((res :any)=>{
      console.log(res);
      this.testInfo = res.data;
    });   
  }
  deleteTest(id){
    console.log(id);
  
    this.http.delete('testTemplet/deleteTestTemplet'+ `/${id}`).subscribe((res : any)=>{
      console.log(res);
      if (res.message === 'Error') {
        console.log(res);
        this.toastr.error('Error Occure', 'Re-enter details');
      }
      if (res.message === 'Record is Not Found') {
        console.log(res);
        this.toastr.warning(res.message, 'Record is not deleted');
      }
      if (res.message === 'Success') {
        this.toastr.success(res.message, 'Record Delete Successfully');
        this.ngOnInit();
      }
    });
  };
}
