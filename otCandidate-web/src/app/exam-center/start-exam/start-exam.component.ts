import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import * as _ from "lodash";

import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.scss']
})
export class StartExamComponent implements OnInit {
  clickedValue: any;
  blurcount: any=0;
  clickOutside: any;
  PublishId: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpService,
    private toastr: ToastrService,
    private elementRef: ElementRef) { }
  index: number;
  temp: any;
  public arra1: any = [];
  testData: any;
  quePosition: any[];
  hasChanges: any;
  currentTime;
  timeLeft;
  timeLeftNew: any;
  id: any;
  public questionText: any;
  public testquestions;
  public questionArray = [];
  public options = [];
  public type: any;
  public correctAns = [];
  public correctAnsQuestionArray = [];
  i;
  iForArray1 = 0;
  public correctMartks = 0;
  public WrongMarks = 0;
  public testdata: any;

  @ViewChild('currentTime') inputView: ElementRef<any>;
 
  ngOnInit() {
    console.log(!!localStorage.getItem('requiedInfoForSetLocalStorage'));
    if (!!localStorage.getItem('requiedInfoForSetLocalStorage')) {
      let requiedInfoForSetLocalStorage = JSON.parse(localStorage.getItem('requiedInfoForSetLocalStorage'));
      console.log(requiedInfoForSetLocalStorage);
      this.arra1 = requiedInfoForSetLocalStorage.Sufflearray;
      this.testquestions = requiedInfoForSetLocalStorage.QuestionArray;
      this.questionArray = this.testquestions.questions;
      this.i = requiedInfoForSetLocalStorage.i;
      this.iForArray1 = requiedInfoForSetLocalStorage.iForArray1;
      this.timeLeft = requiedInfoForSetLocalStorage.timeLeft;
      this.PublishId=requiedInfoForSetLocalStorage._id;
      console.log(requiedInfoForSetLocalStorage.CandidateAnswer);
      this.i = this.arra1[this.iForArray1];
      this.correctAnsQuestionArray = requiedInfoForSetLocalStorage.correctAnswer;
      this.setValue(this.i);
      localStorage.removeItem("requiedInfoForSetLocalStorage");
    } else {
      console.log("else Block");
      this.getdata();
    }
  }
  getdata() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    var params = {
      id: this.id
    }
    this.http.get('publishTest/getTestById').subscribe((res: any) => {
      this.testData = res.data;
      
      this.testData = _.find(res.data, ['testId._id', this.id]);
      console.log(this.testData);
      this.PublishId=this.testData._id;
      console.log(this.PublishId);
      this.timeLeft = parseInt(this.testData.testId.duration) * 60;
        });
    this.http.get('exam/getTestDetails', params).subscribe((res: any) => {
      this.testquestions = res[0];
      this.questionArray = this.testquestions.questions;
      var quelength = this.testquestions.questions.length;

      for (let i = 0; i < quelength; i++) {
        this.arra1.push(i);
      }
      this.arra1 = this.shuffle(this.arra1);
      this.i = this.arra1[this.iForArray1];
      this.setValue(this.i);

    });
  }
  setValue(i) {    
    if (i < this.questionArray.length) {
      this.questionText = this.questionArray[i].question.questionText;
      console.log(this.questionText);
      this.type = this.questionArray[i].question.type === "Multiple_Choice" ? true : false;
      this.options = this.questionArray[i].question.options;
      this.correctAns = [];
    } else {
      console.log("else part of next method");
      this.finalResult();
    }
  }
  nextQuestion(quePosition) {  
    if (this.i < this.questionArray.length) {
      if (this.type) {
        if (this.correctAns[0] === undefined) {
          this.correctMartks = this.correctMartks - 0;
          this.setCorrectAnsArray(this.i, "NotAttented", this.correctMartks, "undefined");
        }
        else {
          let unionArray = this.correctAns[0] === this.questionArray[this.i].question.correctAns[0] ? true : false;
          if (unionArray) {
            this.correctMartks = this.correctMartks + this.questionArray[this.i].rightMarks;
            this.setCorrectAnsArray(this.i, "right", this.correctMartks, this.correctAns[0]);
          }
          else {
            this.correctMartks = this.correctMartks - this.questionArray[this.i].worngMarks;
            this.setCorrectAnsArray(this.i, "wrong", this.correctMartks, this.correctAns[0]);
          }
        }
      }
      else {
        //   console.log("*************************");
        let count = 0;
       
        if (this.correctAns[0] === undefined) {
          this.correctMartks = this.correctMartks - 0;
          this.setCorrectAnsArray(this.i,"NotAttented", this.correctMartks,"undefined");
        } else {
       
          if (this.questionArray[this.i].question.correctAns.length === this.correctAns.length) {
            for (let i = 0; i < this.questionArray[this.i].question.correctAns.length; i++) {
              for (let j = 0; j < this.questionArray[this.i].question.correctAns.length; j++) {
                if (this.questionArray[this.i].question.correctAns[i] === this.correctAns[j]) {
                  count++;
                }
              }
            }
            console.log(count);
            if (count === this.correctAns.length) {           
              this.correctMartks = this.correctMartks + this.questionArray[this.i].rightMarks;
              this.setCorrectAnsArray(this.i, "right", this.correctMartks, this.correctAns);
            }
            else {
              console.log("this.testData.testId.questions, this.questionArray[this.i].question");             
              this.correctMartks = this.correctMartks - this.questionArray[this.i].worngMarks;
              this.setCorrectAnsArray(this.i, "wrong", this.correctMartks, this.correctAns);
            }
          }
        }
      }
      this.i = this.arra1[++this.iForArray1];
      this.setValue(this.i);
    }
    else {
      this.finalResult();
    }
  }
  checkCorrectAns(event, type) {
    if (type === "Radio") {
      this.correctAns = [];
      this.correctAns.push(parseInt(event.target.value));
    }
    if (type === "Checkbox") {
      if (event.target.checked && !(this.correctAns.includes(parseInt(event.target.value)))) {
        this.correctAns.push(parseInt(event.target.value));
      }
      else {
        if (!(event.target.checked) && (this.correctAns.includes(parseInt(event.target.value)))) {
          _.pull(this.correctAns, parseInt(event.target.value));
        }
      }
    }
    console.log(this.correctAns);
  }
  finalResult() {
    this.timeLeft = 0;
    console.log(this.testData);
   console.log(this.correctAnsQuestionArray);
    let status="Fail";
 if(this.testquestions.passingScore <this.correctMartks ){
status="Pass"
 }
let result={
  "questionCount":this.questionArray.length,
  "testResult" :  this.correctAnsQuestionArray,
  "totalScore": this.testquestions.totalScore,
  "passingScore":this.testquestions.passingScore,
  "testname":this.testquestions.testName,
  "status":status,
  "id":this.PublishId
}
 console.log(status);
this.http.post('publishTest/updateResult',result).subscribe((res: any)=>{

});
localStorage.setItem("result",JSON.stringify(result));
 this.router.navigate(['/exam/finalResult']);
  }
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
   
    while (0 !== currentIndex){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  onNotify(value) {
    console.log("hi", value)
    value = value / 1000;
    if (value === 10) {
      this.toastr.success('Time left in seconds' + value, 'Notification', {
        timeOut: 2000
      });
    } else {
      this.toastr.error('Time left in seconds' + value, 'Notification');
    }

  }
  setCorrectAnsArray(id, status, correctMarks, CandidateAnswer ) {
    console.log(id, status, correctMarks, CandidateAnswer);
    this.correctAnsQuestionArray.push({
      id: id,
      status: status,
      correctMarks: correctMarks,
      CandidateAnswer: CandidateAnswer,
    });
    console.log(this.correctAnsQuestionArray);
  }
  setLocalStorageItem() { 
    let time: any = this.inputView;    
    let requiedInfoForSetLocalStorage = {
      'Sufflearray': this.arra1,
      'iForArray1': this.iForArray1,
      'i': this.i,
      'timeLeft': time.left / 1000,
      'QuestionArray': this.testquestions,
      'correctAnswer':this.correctAnsQuestionArray,
      "_id": this.PublishId
    }
    localStorage.setItem('requiedInfoForSetLocalStorage', JSON.stringify(requiedInfoForSetLocalStorage));
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    this.setLocalStorageItem();
  }

  @HostListener('window:focus', ['$event'])
    onFocus(event: any): void {
      console.log(event)
      this.toastr.success("You Lost Your " +(this.blurcount+1)+ " Chance")
          this.blurcount++;
          this.setLocalStorageItem();
          if(this.blurcount>3){
            this.toastr.success("You Lost Your Test")
        this.finalResult();
        localStorage.removeItem("requiedInfoForSetLocalStorage");
          }
    }

    // @HostListener('window:blur', ['$event'])
    // onBlur(event: any): void {
    //   console.log(event)
    //   this.toastr.success("You Lost Your " +(this.blurcount+1)+ " Chance")
    //       this.blurcount++;
    //       this.setLocalStorageItem();
    //       if(this.blurcount>3){
    //         this.toastr.success("You Lost Your Test")
    //     this.finalResult();
    //       }
    // }
  // @HostListener('window:blur', ['$event']) 
  // blur(event) {
  //   console.log(event)
  //   // do something here 
  //   this.setLocalStorageItem();
  //   console.log("method called");
  // }
  // @HostListener("input", ["$event.target.value"])
  // onInput(value) {
  //   console.log(value)
  // }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {

    var r = confirm("You pressed a Back button! Are you sure?!");
console.log(r , window.location.pathname, event);
    if (r == true) {
      // Call Back button programmatically as per user confirmation.
      history.back();
      // Uncomment below line to redirect to the previous page instead.
      // window.location = document.referrer // Note: IE11 is not supporting this.
  } else {
    console.log(r);
      // Stay on the current page.
      history.pushState(null, null, window.location.pathname);
  }

 history.pushState(null, null, window.location.pathname);
  }
  // @HostListener('document:click', ['$event', '$event.target'])
  // onClick(event: MouseEvent, targetElement: HTMLElement): void {
  //     console.log(event,targetElement);
  //   if (!targetElement) {
  //         return;      }
  //     const clickedInside = this.elementRef.nativeElement.contains(targetElement);
  //     if (!clickedInside) {
  //         this.clickOutside.emit(event);
  //     }
  // }
  // @HostListener('document:click', ['$event'])
  // onClickEvent(event: MouseEvent) {
  //   console.log( event.returnValue);
  //   //this.setLocalStorageItem();
  //   var target = event.target || event.srcElement;
  //   var id = target['id']
   
  //   this.clickedValue = id;
  //   console.log( id , this.clickedValue);

  // }
}