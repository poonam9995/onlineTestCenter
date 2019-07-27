import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { commonValidation } from 'src/app/auth/common/validation/common.validation';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {
  updateQuestion: FormGroup;
  CorrectAns = [];
  CorrectAnsArray = [];
  tagsArray: any = [];
  optionArray = [];
  multipleChoice = false;
  multipleResponse = false;
  data: any;
  topic;
  list
  id;
  newPref1 = [];
  closeBtnName: string;
  optionsArr: any = [];
CorrectAnsRadio ;
  details: any = [];
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService,
    private bsModel: BsModalService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    console.log(this.list);
    this.http.get('subject/findSubject').subscribe((res: any) => {
      this.data = res.data;
      console.log(this.data);
    });
    this.getQuestionData(this.list);

    this.updateQuestion = new FormGroup({
      id: new FormControl(''),
      subjectId: new FormControl('', Validators.required),
      topicId: new FormControl('', Validators.required),
      questionText: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      correctAnswers: new FormControl('', Validators.required),
      options: new FormArray([], commonValidation.checkOption),
      solution: new FormControl(''),
      tags: new FormControl('')
    });

  }
  createOption(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(''),
    });
  }
  createOptionWithValue(value): FormGroup {
    this.optionArray.push()
    return this.formBuilder.group({
      id: new FormControl(value),
    });
  }
  addgroupClick(): void {
    (<FormArray>this.updateQuestion.get('options')).push(this.createOption());
  }
  getQuestionData(id) {
    console.log(id);
    var params = {
      id: id
    }
    console.log(params);
    this.http.get('questions/QuestionById', params).subscribe((res: any) => {
      console.log(res.data);
      console.log(res.data.correctAns);

      var tpc = res.data.topicId;
      this.updateQuestion.patchValue({
        'id': res.data._id,
        'subjectId': res.data.topicId.subjectId._id,
        'topicId': tpc._id,
        'questionText': res.data.questionText,
        'solution': res.data.solution,
        'type': res.data.type,
        'tags': res.data.tags,
      });


      this.tagsArray = res.data.tags;
      res.data.options.forEach((element, key) => {
        (<FormArray>this.updateQuestion.get('options')).push(this.createOptionWithValue(element.name));
        this.optionArray.push({ id: element.id, name: element.name });
        this.newPref1[key] = false;
        for (var j = 0; j < res.data.correctAns.length; j++) {
          if (res.data.correctAns[j] == element.id) {
            this.newPref1[key] = true;
            this.CorrectAns.push(this.optionArray[key].name);
            this.CorrectAnsArray.push(this.optionArray[key].id);
          }

        }
      });

      console.log(res.data.correctAns);
      if (res.data.type == 'Multiple_Choice') {
        this.multipleChoice = true;
        this.multipleResponse = false;
        this.CorrectAnsRadio= res.data.correctAns[0];

     
      }
      else {
        this.multipleChoice = false;
        this.multipleResponse = true;
        this.updateQuestion.patchValue({
          'correctAnswers': this.CorrectAns
        });

      }
    });
  }
  onAddCorrect(event) {
    const answer = event;
    console.log(answer.id);
    var checkTORF = 0;
    for (var i = 0; i < this.CorrectAnsArray.length; i++) {
      if (answer.id == this.CorrectAnsArray[i]) {
        checkTORF++;
      }
    }
    if (checkTORF == 0) {
      console.log(event.id, this.CorrectAnsArray[i]);
      this.CorrectAnsArray.push(answer.id);
    }

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
    if (event.value == undefined) {
      console.log(event.value);
      this.tagsArray.splice(i, 1);
    } else {
      for (var i = 0; i < this.tagsArray.length; i++) {
        if (event.value == this.tagsArray[i]) {
          console.log(event.value);
          this.tagsArray.splice(i, 1);
        }

      }
    }
    console.log(this.tagsArray);

  }

  addOptions(event, i) {
    console.log(i, event.target.value);

    var counter = 0;
    if (this.optionArray.length == 0) {
      this.optionArray.push({ id: i, name: event.target.value })
    }
    else {
      for (let j = 0; j < this.optionArray.length; j++) {
        if (i == this.optionArray[j].id) {
          console.log('hiiiiiiiii');
          this.optionArray[j].name = event.target.value;
          console.log(this.optionArray[j]);
          break;
        }
        counter++;
      }
      if (counter == this.optionArray.length) {
        this.optionArray.push({ id: i, name: event.target.value });
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
  correctAnswersChecked(event, id) {

    // console.log(this.optionArray);   
    console.log(this.CorrectAnsArray);
    if (event.target.checked == true) {
      for (var i = 0; i < this.CorrectAnsArray.length; i++) {
        console.log(event.target.checked, id);
        if (this.CorrectAnsArray[i] != id) {
          this.CorrectAnsArray.push(id);
          break;
        }
      }
    }
    if (event.target.checked == false) {
      console.log('event.target.checked, id');
      for (var i = 0; i < this.CorrectAnsArray.length; i++) {
        if (this.CorrectAnsArray[i] == id) {
          console.log(this.CorrectAnsArray[i], id);
          this.CorrectAnsArray.splice(i, 1);

        }

      }
    }
    console.log(this.CorrectAnsArray);


  }
  onSubmit() {
    if(this.updateQuestion.value.correctAnswers === undefined || this.updateQuestion.value.correctAnswers === ""  ){
      this.updateQuestion.value.correctAnswers=this.CorrectAnsRadio;
    }
    console.log(this.updateQuestion.value);
    console.log(this.optionArray);
    console.log("***", this.CorrectAnsArray);
   if(this.updateQuestion.value.type === 'Multiple_Response')
   {
    this.updateQuestion.value.correctAnswers=this.CorrectAnsArray;
   }
    const questions = {
      "correctAnswers":this.updateQuestion.value.correctAnswers,
      "options": this.optionArray,
      "questionText": this.updateQuestion.value.questionText,
      'solution': this.updateQuestion.value.solution,
      'subjectId': this.updateQuestion.value.subjectId,
      'tags': this.tagsArray,
      'topicId': this.updateQuestion.value.topicId,
      'type': this.updateQuestion.value.type
    }
    console.log(questions, this.updateQuestion.value.id);
   var params = {
      id: this.updateQuestion.value.id
    }
    this.http.put('questions/updateQuestion', questions, params).subscribe((res: any) => {
      if (res.message === 'Error') {
        console.log(res);
        this.toastr.error('Error Occure', 'Re-enter details');
      }
      if (res.message === 'Failed') {
        console.log(res);
        this.toastr.warning(res.message);
      }
      if (res.message === 'Success') {
        this.toastr.success(res.message, 'Record insert Successfully');
      }

    });
   this.bsModel.hide(this.bsModel.getModalsCount());
  }
  close() {
    this.bsModel.hide(this.bsModel.getModalsCount());
  }
  deleteRow(index: number) {
    console.log(index);
    // console.log(this.optionArray[index]);
    (<FormArray>this.updateQuestion.get('options')).removeAt(index);
    this.optionArray.splice(index, 1);
    //  console.log(this.optionArray);
    console.log(this.CorrectAnsArray);
    for (var i = 0; i < this.CorrectAnsArray.length; i++) {
      if (this.CorrectAnsArray[i] == (index + 1)) {
        console.log(this.CorrectAnsArray[i], index);
        this.CorrectAnsArray.splice(i);

      }

    }
    console.log(this.CorrectAnsArray);
  }
  correctAnsRadio(i){
    if(i === undefined)
    {
      
    }
console.log(i);
  }
}
