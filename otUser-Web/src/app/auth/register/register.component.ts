import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { commonValidation } from '../common/validation/common.validation';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  constructor(public bsModalRef: BsModalRef, private http: HttpService, private toastr: ToastrService) { }

  ngOnInit() {
    this.register = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      cpassword: new FormControl('', commonValidation.checkPassword)
    });
  }
  onSubmit() {
    console.log(this.register.value);
    this.http.simplePost('admin/addAdmin', this.register.value).subscribe((res: any) => {
      if(res.message==='Error Occure')
      {
        console.log(res);
        this.toastr.error('Error Occure','Re-enter details');
      }    
      if(res.message === 'User Already Has Account')
      {
        console.log(res);
        this.toastr.warning(res.message);
      }
      if (res.message === 'Success'){
        console.log(res);
       this.toastr.success(res.message, 'Toastr fun!');
      }

    });
  }
}
