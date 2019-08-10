import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/_shared/services/http/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  bsModalRef: BsModalRef;
  id: any;
  constructor(private http: HttpService,private modalService: BsModalService,private router :Router,private toastr :ToastrService,private route : ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.id = params['id']
    // });
    // console.log(this.id);
    this.login= new FormGroup({
      email: new FormControl('',[Validators.required ,Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)]),
      password:new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    console.log(this.login.value, this.id);
    var params = {
      id: this.id
    }
    this.http.post('user/userLogin',this.login.value,params).subscribe((res:any)=>{
      console.log(res);
      if(res.message == 'Failed'){
        this.toastr.warning('Authentication Failed','Email_id Not Match');
        this.router.navigate(['/login']);
      }
      if(res.message ==='Success')
      {
        console.log(res.token);
        localStorage.setItem('token',res.token);
        console.log(res.token);
        this.router.navigate(['/dashboard/default']);
      }else{
        this.router.navigate(['/login']);
      }
      
    });
  }
  openModalWithComponentforgot(){
    this.bsModalRef = this.modalService.show(ForgetPasswordComponent,{class:'model-sm'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
