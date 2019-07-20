import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  
  constructor(private httpService: HttpService,private modalService: BsModalService) { }
  login :FormGroup;
  ngOnInit() {
    this.login= new FormGroup({
      email: new FormControl('',[Validators.required ,Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)]),
      password:new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    console.log(this.login.value);
    this.httpService.simplePost('admin/adminLogin',this.login.value).subscribe((res)=>{
      console.log(res);
    });
  }
   openModal(){
    this.modalRef = this.modalService.show(SignupComponent, { class: 'modal-lg'});
  }
  openModalWithComponentforgot(){
    this.modalRef = this.modalService.show(ForgotPasswordComponent ,{class:'modal-sm'});
  }
}
