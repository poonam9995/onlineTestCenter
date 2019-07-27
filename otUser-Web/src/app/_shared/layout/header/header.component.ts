import { Component, OnInit } from '@angular/core';

  import { RegisterComponent } from 'src/app/auth/register/register.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { HttpService } from '../../services/http/http.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService,private http:HttpService) { }

  ngOnInit() {
  }
  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(RegisterComponent,{class:'model-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
