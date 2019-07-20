import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { RegisterComponent } from '../register/register.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[HttpService]
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  bsModalRef: BsModalRef;
  constructor(private httpService: HttpService,private modalService: BsModalService,private router :Router,private toastr :ToastrService) { }

  ngOnInit() {
    this.login= new FormGroup({
      email: new FormControl('',[Validators.required ,Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)]),
      password:new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    console.log(this.login.value);
    this.httpService.simplePost('admin/adminLogin',this.login.value).subscribe((res:any)=>{
      console.log(res);
      if(res.message == 'Auth failed'){
        this.toastr.warning('Email_id Not Match');
        this.router.navigate(['/login']);
      }
      if(res.message ==='Success')
      {
        console.log(res.token);
        localStorage.setItem('token',res.token);
       this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/login']);
      }
      
    });
  }
  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(RegisterComponent,{class:'model-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openModalWithComponentforgot(){
    this.bsModalRef = this.modalService.show(ForgetPasswordComponent,{class:'model-sm'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }


}
