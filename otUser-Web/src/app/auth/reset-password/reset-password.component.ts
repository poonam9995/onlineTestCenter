import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { commonValidation } from '../common/validation/common.validation';
import { HttpSentEvent } from '@angular/common/http';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup;
  id: FormGroup;

  constructor(private route: ActivatedRoute,private router : Router,private http : HttpService,private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    this.resetPassword = new FormGroup({
        
      password: new FormControl('',Validators.required),
       cpassword: new FormControl('', commonValidation.checkPassword),
     });
  }
  onSubmit(){
   console.log(this.resetPassword.value);
this.http.simplePost('admin/resetPassword'+`/${this.id}`,this.resetPassword.value).subscribe((res : any)=>{
  console.log(res);
  if(res.message === 'Failed'){
    console.log(res);
  this.toastr.error('Password Not Change');
  this.router.navigate(['/auth/login']);
  }
  if(res.message === 'Success')
  {
    console.log(res);
    this.toastr.success('Password Change Successfully');
    this.router.navigate(['/auth/login']);
  }
  if(res.message === 'Auth Failed')
  {
    console.log(res);
    this.toastr.error('Authentication Failed.Check User EmailId');
  }
});
  }
}
