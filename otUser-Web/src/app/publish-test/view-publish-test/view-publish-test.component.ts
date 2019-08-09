import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-view-publish-test',
  templateUrl: './view-publish-test.component.html',
  styleUrls: ['./view-publish-test.component.scss']
})
export class ViewPublishTestComponent implements OnInit {
  testDetails: any;
  candidateDetails: any;
  modalRef: BsModalRef;
  constructor(private http: HttpService,private toastr : ToastrService,private modalService: BsModalService) { }

  ngOnInit() {
 this.http.get('publishTest/findPublishTest').subscribe((res: any)=>{
  console.log(this.testDetails);
  if(res.message == 'Success'){
    this.testDetails = res.data;
  }
  else{
    this.toastr.warning(res.message);
  }
  console.log(this.testDetails);
 });
  }
  DisplayCondidateList(template: TemplateRef<any>,id){
    for(let i= 0;i<this.testDetails.length;i++){
      if(this.testDetails[i]._id === id){
      this.candidateDetails = this.testDetails[i].candidateList;
      }
    }
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
