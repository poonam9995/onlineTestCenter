import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-publish-test',
  templateUrl: './add-publish-test.component.html',
  styleUrls: ['./add-publish-test.component.scss']
})
export class AddPublishTestComponent implements OnInit {
  AddPublishedTest: FormGroup;
  uploadfile: any;
  public formData = new FormData();
  constructor(private http: HttpService,private toastr : ToastrService,private router: Router) { }
testData;
  ngOnInit() {
this.http.get('testTemplet/findPublishedTestTemplet').subscribe((res :any)=>{
  console.log(res);
  this.testData =res.data;
});
this.AddPublishedTest = new FormGroup({
  title:new FormControl(),
  description : new FormControl(),
  file:new FormControl(),
  testId: new FormControl(),
  testDate : new FormControl()
})
  }

  onFileChange(event){
    this.uploadfile = event.target.files[0];
    console.log(this.uploadfile);
  // this.formData.append("file",this.uploadfile);
    }
  onSubmit(){
    this.formData=new FormData();
    console.log(this.AddPublishedTest.value);

    const test = {
      'title': this.AddPublishedTest.value.title,
      'description': this.AddPublishedTest.value.description,
      'testId': this.AddPublishedTest.value.testId,
      'testDate':this.AddPublishedTest.value.testDate,
      "file":this.uploadfile
    }
    Object.entries(test).forEach(
      ([key, value]: any[]) => {
        this.formData.append(key, value);
      });

 this.http.post('publishTest/savePublishTest',this.formData).subscribe((res : any)=>{
  if (res.message === 'Error') {
    console.log(res);
    this.toastr.error('Error Occure', 'Re-enter details');
  }
  if(res.message === 'Record not inserted') {
    console.log(res);
    this.toastr.warning(res.message);
  }
  if (res.message === 'Success') {              
    this.toastr.success(res.message, 'Test Publish Successfully');
  this.router.navigate(['PublishTest/viewPublishTest']);
  }
 })
  }
  
}
