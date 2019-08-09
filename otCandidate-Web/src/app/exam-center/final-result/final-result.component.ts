import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import * as _ from "lodash";
@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss']
})
export class FinalResultComponent implements OnInit {
  data;
  status: any;
  attented: any = 0;
  correctAns: any;
  constructor(private route: ActivatedRoute, private http: HttpService, private router: Router) { }
  testname;
  correctCount = 0;
  wrongCount = 0;
  totalQuestions;
  totalscore = 0;
  ngOnInit() {
    if (!!localStorage.getItem("result")) {
      var result = JSON.parse(localStorage.getItem("result"));
      console.log(result);
      this.totalQuestions = result.testResult.length;
      this.testname = result.testname;
      this.totalscore = result.totalScore;
      this.status = result.status;
      console.log(this.testname);
      this.correctAns = result.testResult[(this.totalQuestions - 1)].correctMarks
      console.log(this.totalQuestions - 1);
      for (let i = 0; i < result.testResult.length; i++) {
        if (result.testResult[i].status === "right") {
          console.log(result.testResult[i]);
          this.correctCount++;
        }
        if (result.testResult[i].status === "wrong") {
          this.wrongCount++;
        }
        if (result.testResult[i].status === "NotAttented") {
          this.attented++;
        }
      }
      this.attented = result.testResult.length - this.attented;
      console.log(this.attented);
      console.log(this.wrongCount);
      console.log(this.correctCount);
      localStorage.removeItem('result');
    } else {
      this.router.navigate(['dashboard/default']);
    }

  }

}
