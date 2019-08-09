import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './_shared/layout/auth-layout/auth-layout.component';
import { HeaderComponent } from './_shared/layout/header/header.component';
import { FooterComponent } from './_shared/layout/footer/footer.component';
import { NavbarComponent } from './_shared/layout/navbar/navbar.component';
import { CommanLayoutComponent } from './_shared/layout/comman-layout/comman-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ExamCenterModule } from './exam-center/exam-center.module';
//import { CountdownModule } from 'ngx-countdown';
import { AuthGuardService } from './auth/auth-guard.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    CommanLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ExamCenterModule,
   // CountdownModule,
    ModalModule.forRoot(),     
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
  
    BrowserAnimationsModule,
  
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
