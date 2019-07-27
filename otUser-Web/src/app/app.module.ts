import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommanLayoutComponent } from './_shared/layout/comman-layout/comman-layout.component';
import { FooterComponent } from './_shared/layout/footer/footer.component';
import { HeaderComponent } from './_shared/layout/header/header.component';
import { NavbarComponent } from './_shared/layout/navbar/navbar.component';
import { AuthLayoutComponent } from './_shared/layout/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule, PopoverModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { SubjectModule } from './subject/subject.module';
import { TopicModule } from './topic/topic.module';
import { AuthGuardService } from './auth/auth-guard.service';
import { QuestionsModule } from './questions/questions.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TestTempletModule } from './test-templet/test-templet.module';
@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    CommanLayoutComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionsModule,
    AuthModule,
    SubjectModule,
    TopicModule,   
    TestTempletModule,
    ReactiveFormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),    
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PopoverModule.forRoot()
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
