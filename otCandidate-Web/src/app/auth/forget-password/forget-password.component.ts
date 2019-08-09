import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPass: FormGroup;

  constructor(public bsModalRef: BsModalRef, private http: HttpService, private toastr: ToastrService, private route : ActivatedRoute,private router : Router) { }

  ngOnInit() {
    this.forgetPass = new FormGroup({

      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),

    });
  }
  onSubmitForget() {
    console.log(this.forgetPass.value);
    this.http.simplePost('user/forgetPassword', this.forgetPass.value).subscribe((res: any) => {
     
     
      if(res.message === 'email transfer failed'){
        console.log(res);
        this.toastr.error(' email transfer failed');      
        }        
        if(res.message === 'Auth Failed')      
        {
          this.toastr.error('Authentication Failed. Check User Email Id');         
        }
      if (res.message === "Success") {
        console.log(res);
        this.toastr.success('Email Send Successfully.. Check User Email.');       
      }
      this.router.navigate(['/auth/login']);
    });
  }
}
