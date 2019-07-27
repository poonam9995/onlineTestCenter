import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-test-templet',
  templateUrl: './add-test-templet.component.html',
  styleUrls: ['./add-test-templet.component.scss']
})
export class AddTestTempletComponent implements OnInit {

  modalRef: BsModalRef;
  public tags = [];
  selectQuestions: FormGroup;
  public questions = [];
  AddQuestions: FormGroup;
  selectedAll=false;
  count: any = 0;
  subjectName: any;
  CorrectAnsArray: any = [];
  addedQuestions: any = [];
  Questioncount: any;
  id: any = [];
  arrayOfTags: any = [];
  totalMarks = 0;
  testerror: string;
  //selectAll:Boolean=false;
  constructor(private modalService: BsModalService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  AddTest: FormGroup;
  ngOnInit() {
    this.AddTest = new FormGroup({
      testName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      totalScore: new FormControl('',Validators.required),
      passScore: new FormControl('', Validators.required),
      duration: new FormControl('',Validators.required),
      questions: new FormArray([]),
      status: new FormControl(''),
    });
    this.selectQuestions = new FormGroup({
      tag: new FormControl('')
    });
    this.AddQuestions = new FormGroup({
      Questions: new FormArray([])
    });
    this.http.get('questions/getQuestion').subscribe((res: any) => {
      console.log(res);
      this.tags = res.data;
    });
  }

  createOptionWithValue(value): FormGroup {
    console.log(value);
    return this.formBuilder.group({
      isSelected: new FormControl(value.isSelected),
      _id: new FormControl(value._id),
      questionText: new FormControl(value.questionText),
      rightMarks: new FormControl('1',Validators.required),
      worngMarks: new FormControl('0',Validators.required),
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
  }


  onSubmit(status) {
    console.log(this.AddTest.value);
    console.log(status);
    console.log(this.addedQuestions);
    this.AddTest.value.status = status;
    this.AddTest.value.questions = this.addedQuestions;
    console.log(this.AddTest.value);
    if (this.testerror === 'Test Already Persent in Database.Plz Update it') {
      this.testerror = 'Test Already Persent in Database.Plz Update it'
      this.toastr.warning(this.testerror);
    }
    else {
      this.http.post('testTemplet/addTestTemplet', this.AddTest.value).subscribe((res: any) => {
        console.log(res);
        if(res.massage == 'Test Already Persent in Database.Plz Update it')
        {
          this.toastr.warning(res.message);
        }
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
          this.selectQuestions.reset();
          this.AddQuestions.reset();
          this.AddTest.reset();
          this.Questioncount = 0;
        }
      });
    }
  }

  onsubmitOnTags() {
  //  console.log(this.selectQuestions.value.tag);
    this.subjectName;
    var check = this.id.includes(this.AddQuestions.get('Questions').value);
    if (!check) {
      this.arrayOfTags.push(this.selectQuestions.value.tag);
    }
  //  console.log(this.arrayOfTags);
    var questionControl = (<FormArray>this.AddQuestions.get('Questions')).controls;
    // console.log('*******', this.selectQuestions.value);
    //    //  console.log(res);
    for (let i = 0; i <= questionControl.length; i++) {
      //    console.log(this.questions[i]);
      (<FormArray>this.AddQuestions.get('Questions')).removeAt(i);
      this.questions.splice(i, 1);
    }
    if (this.subjectName == "") {

      this.subjectName = this.selectQuestions.value.tag;
      var params = {
        tag: this.CorrectAnsArray
      }
   //   console.log(params);
      this.http.post('questions/ge element.checked=event.target.checked;Tags', params).subscribe((res: any) => {

        this.questions = [];
        this.questions = res.data; //element.checked=event.target.checked;
     //   console.log(this.questions);

        for (var i = 0; i < this.questions.length; i++) {
          this.questions[i].isSelected = false;
          var check = this.id.includes(this.questions[i]._id);
      //    console.log(check);
          if (!check) {
            (<FormArray>this.AddQuestions.get('Questions')).push(this.createOptionWithValue(this.questions[i]));
          }
        }
      })
    }
    else {
      if (this.selectQuestions.value.tag == this.subjectName) {

      }
      else {
        var questionControl = (<FormArray>this.AddQuestions.get('Questions')).controls;
        for (let i = 0; i <= questionControl.length; i++) {
    //      console.log(this.questions[i]);
          (<FormArray>this.AddQuestions.get('Questions')).removeAt(i);
        }
        this.subjectName = this.selectQuestions.value.tag;
        var params = {
          tag: this.CorrectAnsArray
        }
        console.log(params);
        this.http.post('questions/getQueAsperTags', params).subscribe((res: any) => {
          //  console.log(res);

          this.questions = [];
          this.questions = res.data;
   //       console.log(this.questions);

          for (var i = 0; i < this.questions.length; i++) {
            this.questions[i].isSelected = false;
            var check = this.id.includes(this.questions[i]._id);
   //         console.log(check);
            if (!check) {

              (<FormArray>this.AddQuestions.get('Questions')).push(this.createOptionWithValue(this.questions[i]));
            }
          }
        })
      }
    }
  }
  onsubmitForQuestionAdd() {
  //  console.log(this.AddQuestions.get('Questions').value);
    if (this.addedQuestions == 0) {
      for (let i = 0; i < this.AddQuestions.get('Questions').value.length; i++) {    //console.log(this.AddQuestions.get('Questions').value[i])
        if (this.AddQuestions.get('Questions').value[i].isSelected) {
          this.addedQuestions.push({
            'question': this.AddQuestions.get('Questions').value[i]._id,
            'rightMarks': this.AddQuestions.get('Questions').value[i].rightMarks,
            'worngMarks': this.AddQuestions.get('Questions').value[i].worngMarks
          });
          this.id.push(this.AddQuestions.get('Questions').value[i]._id);
          this.totalMarks += +this.AddQuestions.get('Questions').value[i].rightMarks;
        }
      }
    }
    else {
      var AddQuetionArray = this.AddQuestions.get('Questions').value;
      for (let j = 0; j < this.addedQuestions.length; j++) {
        for (let i = 0; i < AddQuetionArray.length; i++) {
          if (this.AddQuestions.get('Questions').value[i].isSelected) {
            var check = this.id.includes(this.AddQuestions.get('Questions').value[i]._id);
    //        console.log(check);
            if (!check) {
              this.addedQuestions.push({
                'question': this.AddQuestions.get('Questions').value[i]._id,
                'rightMarks': this.AddQuestions.get('Questions').value[i].rightMarks,
                'worngMarks': this.AddQuestions.get('Questions').value[i].worngMarks
              });
              this.id.push(this.AddQuestions.get('Questions').value[i]._id);
              this.totalMarks += +this.AddQuestions.get('Questions').value[i].rightMarks;
            }
          }
        }
      }

    }
 //   console.log(this.addedQuestions);
 //   console.log(this.id);
    this.Questioncount = this.addedQuestions.length;
  }
  onAddtag(event) {
    const answer = event;
    console.log(answer);
    this.CorrectAnsArray.push(answer.value);
    console.log("---------------------------------", this.CorrectAnsArray);
  }
  onRemovetag(event) {
    console.log(event.value);
    console.log(this.CorrectAnsArray);
    for (var i = 0; i < this.CorrectAnsArray.length; i++) {
      if (event.value == this.CorrectAnsArray[i]) {
        console.log(event);
        this.CorrectAnsArray.splice(i, 1);
      }
    }
    console.log(this.CorrectAnsArray);

  }

  selectAll(event) {
   // console.log(event.target.checked);
      
    var question=(<FormArray>this.AddQuestions.get('Questions'));
    
    question.value.forEach(element => {
      element.isSelected = event.target.checked;
    //  console.log(element);
      this.selectedAll=event.target.checked;
     });
     }
  
  close() {
   // console.log(this.addedQuestions);   
    console.log(this.totalMarks);
    this.AddTest.patchValue({
      'totalScore': this.totalMarks,
    });
    this.modalRef.hide();
  }
  CheckUniqueTestName(event) {
    console.log(event.target.value);
    var value = {
      testName: event.target.value
    }
    this.http.post('testTemplet/CheckUniqueTest', value).subscribe((res: any) => {
      console.log(res);
      if (res.massage === 'Test Already Persent in Database.Plz Update it') {
        this.testerror = 'Test Already Persent in Database.Plz Update it';
        console.log('Test Already Persent in Database.Plz Update it');
      }
      if (res.massage === 'test Not Present') {
        this.testerror = '';
      }
    });
  }

}
