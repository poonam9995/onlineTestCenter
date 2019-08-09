import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { commonValidation } from 'src/app/auth/common/validation/common.validation';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  addQuestion: FormGroup;
  public optionArray = [];
  public idForOptionArray = 1;
  data: any;
  topicData: any;
  SubjectName: any;
  topic: any;
  multile: boolean;
  multipleResponse: boolean;
  multipleChoice: boolean;
  public CorrectAnsArray: any = [];
  tagsArray: any = [];
  countOptionArray =0;
  constructor(private formBuilder: FormBuilder, private http: HttpService,private toastr : ToastrService) { }

  ngOnInit() {
    this.http.get('subject/findSubject').subscribe((res: any) => {
      this.data = res.data;
      console.log(this.data);
    });

    this.addQuestion = new FormGroup({
      subjectId: new FormControl('', Validators.required),
      topicId: new FormControl('', Validators.required),
      questionText: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      correctAnswers: new FormControl('', Validators.required),
      options: new FormArray([this.createOption(),this.createOption()], [commonValidation.checkOption]),
      solution: new FormControl(''),
      tags: new FormControl('')
    });
    //   this.idForOptionArray= this.addQuestion.controls['options'].value;
    //  console.log(this.idForOptionArray);
  }
 
  createOption(): FormGroup {
    return this.formBuilder.group({
      option: new FormControl(''),  
    });
  }
  addgroupClick(): void {
    this.countOptionArray ++;
 console.log(this.countOptionArray);
    (<FormArray>this.addQuestion.get('options')).push(this.createOption());
  }
  onAddCorrect(event) {
    const answer = event;
    this.CorrectAnsArray.push(answer.id);
    console.log("---------------------------------", this.CorrectAnsArray);
  }
  onRemoveCorrect(event) {
    console.log(event);
    console.log(this.CorrectAnsArray);
    for (var i = 0; i < this.CorrectAnsArray.length; i++) {
      if (event.id == this.CorrectAnsArray[i]) {
        console.log(event);
        this.CorrectAnsArray.splice(i, 1);
      }
    }
    console.log(this.CorrectAnsArray);

  }
  onAddTags(event) {
    const answer = event.value;
    console.log(answer);
    this.tagsArray.push(answer);
    console.log("---------------------------------", this.tagsArray);
  }
  onRemoveTags(event) {
    console.log(event.value);
    console.log(this.tagsArray);
    for (var i = 0; i < this.tagsArray.length; i++) {
      if (event.value == this.tagsArray[i]) {
        console.log(event.value);
        this.tagsArray.splice(i, 1);
      }
    }
    console.log(this.tagsArray);

  }

  addOptions(event, i) {
    console.log(this.optionArray);
    var counter=0;
    if(this.optionArray.length == 0)
    {
      this.optionArray.push({ id: i, name: event.target.value})
    }
    else{
      for(let j=0; j<this.optionArray.length;j++ ){
        if(i==this.optionArray[j].id){
          console.log('hiiiiiiiii');
          this.optionArray[j].name=event.target.value;
          console.log(this.optionArray[j]);
          break;
        }
        counter++;
      }
      if(counter==this.optionArray.length){   
        this.optionArray.push({ id: i, name: event.target.value});
      }
      
    }
   
    console.log(i, event.target.value);

console.log(this.optionArray);


  }

  displayTopic(event) {
    // console.log(event);    
    console.log("event value", event.target.value);
    var params = {
      subjectId: event.target.value
    }
    this.http.get('topic/findTopic', params).subscribe((res: any) => {

      this.topic = res.data;
      console.log(this.topic);
    });
  }
  multipleSelection(event) {
    console.log(event.target.value);
    if (event.target.value == 'Multiple_Choice') {
      this.multipleChoice = true;
      this.multipleResponse = false;
    }
    else {
      this.multipleChoice = false;
      this.multipleResponse = true;
    }
  }
  onSubmit() {
    console.log(this.addQuestion.get('options'))
    if(this.addQuestion.valid){
    console.log(this.addQuestion.value);
    console.log(this.optionArray);
    console.log("***", this.CorrectAnsArray);
    console.log("CorrectAns",this.addQuestion.value.correctAnswers);
    
    
    const questions = {
      "correctAnswers": this.addQuestion.value.correctAnswers,
      "options": this.optionArray,
      "questionText": this.addQuestion.value.questionText,
      'solution': this.addQuestion.value.solution,
      'subjectId': this.addQuestion.value.subjectId,
      'tags': this.tagsArray,
      'topicId': this.addQuestion.value.topicId,
      'type': this.addQuestion.value.type
    }
    console.log(questions);
    this.http.post('questions/addQuestions', questions).subscribe((res: any) => {
      if (res.message === 'Error') {
        console.log(res);
        this.toastr.error('Error Occure', 'Re-enter details');
      }
      if(res.message === 'Failed') {
        console.log(res);
        this.toastr.warning(res.message);
      }
      if (res.message === 'Success') {              
        this.toastr.success(res.message, 'Record insert Successfully');
        this. ngOnInit();
        this.optionArray=[];
   this.CorrectAnsArray=[];
        this.tagsArray = [];
      }
          
    });
  }
  else{

  }
  }

  deleteRow(index: number) {
    console.log(index);
   // console.log(this.optionArray[index]);
    (<FormArray>this.addQuestion.get('options')).removeAt(index);
   this.optionArray.splice(index ,1);
  //  console.log(this.optionArray);
  console.log(this.CorrectAnsArray);
    for (var i = 0; i < this.CorrectAnsArray.length; i++) {        
      if (this.CorrectAnsArray[i] == (index+1)) {
         console.log(this.CorrectAnsArray[i] , index);
        this.CorrectAnsArray.splice(i);
       
       }

     }
     console.log(this.CorrectAnsArray);
  }
}
