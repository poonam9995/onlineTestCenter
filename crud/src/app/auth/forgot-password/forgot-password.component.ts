import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/_shared/services/http/http.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  changePass : FormGroup;
  constructor(private httpService : HttpService) { }

  ngOnInit() {
    this.changePass= new FormGroup({
      
    });
  }

}
