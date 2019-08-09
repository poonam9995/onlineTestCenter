import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private http : HttpService,private router: Router) { }
public testData;
  ngOnInit() {

this.http.get('publishTest/getTestById').subscribe((res : any)=>{
this.testData = res.data;
console.log(res.data);
//var token = this.http.getToken();
});
  }
  startExam(testId){
    console.log(b.testId  );
this.router.navigate(['exam/startExam/'+`${testId}`,{data :b}]);
var b = _.find(this.testData, ['testId._id',testId]);
console.log('value of b',b);
localStorage.setItem('testData',b.tsetId)
  }
}
