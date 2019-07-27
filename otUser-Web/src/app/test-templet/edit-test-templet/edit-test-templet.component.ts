import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { EditQuestionsComponent } from 'src/app/questions/edit-questions/edit-questions.component';

@Component({
  selector: 'app-edit-test-templet',
  templateUrl: './edit-test-templet.component.html',
  styleUrls: ['./edit-test-templet.component.scss']
})
export class EditTestTempletComponent implements OnInit {
  updateTest: FormGroup;
  selectQuestions: FormGroup;
  selectedAll:Boolean=false;
  id = [];
  testid;
  testData = [];
  modalRef: BsModalRef;
  tags: any;
  CorrectAnsArray: any = [];
  AddQuestions: FormGroup;
  addedQuestions: any = [];
  tagName: any;
  arrayOfTags: any = [];
  questions: any = [];
  totalMarks: number = 0;
  Questioncount: number;
  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpService, private modalService: BsModalService, private formBuilder: FormBuilder,
    private toastr: ToastrService ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.testid = params['id']
    });
    console.log(this.testid);
    var params = {
      'id': this.testid
    }
    this.updateTest = new FormGroup({
      testName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      totalScore: new FormControl('', Validators.required),
      passScore: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      questions: new FormArray([]),
      status: new FormControl(''),
      count: new FormControl(''),
    });
    this.http.get('testTemplet/findTestTemplet', params).subscribe((res: any) => {
console.log(res.data);
      this.updateTest.patchValue({
        'testName': res.data.testName,
        'description': res.data.description,
        'totalScore': res.data.totalScore,
        'passScore': res.data.passingScore,
        'duration': res.data.duration,
        'status':res.data.status,
        'count':res.data.questions.length,      
      });

      for (let i = 0; i < res.data.questions.length; i++) {
        this.testData.push({
          '_id': res.data.questions[i].question._id,
          'questionText': res.data.questions[i].question.questionText,
          'rightMarks': res.data.questions[i].rightMarks,
          'worngMarks': res.data.questions[i].worngMarks
        })
        this.id.push(res.data.questions[i].question._id);
      }

      console.log(this.testData);
    });
    this.http.get('questions/getQuestion').subscribe((res: any) => {
      console.log(res);
      this.tags = res.data;
    });
    this.selectQuestions = new FormGroup({
      tag: new FormControl('')
    });
    this.AddQuestions = new FormGroup({
      Questions: new FormArray([])
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
  }
  createOptionWithValue(value): FormGroup {
    return this.formBuilder.group({
      isSelected: new FormControl(value.isSelected),
      _id: new FormControl(value._id),
      questionText: new FormControl(value.questionText),
      rightMarks: new FormControl('1', Validators.required),
      worngMarks: new FormControl('0', Validators.required),
    });
  }
  onsubmitOnTags() {
  
    this.tagName;
    var check = this.id.includes(this.AddQuestions.get('Questions').value);
    if (!check) {
      this.arrayOfTags.push(this.selectQuestions.value.tag);
    }
    var questionControl = (<FormArray>this.AddQuestions.get('Questions')).controls;
    for (let i = 0; i <= questionControl.length; i++) {
      (<FormArray>this.AddQuestions.get('Questions')).removeAt(i);
      this.questions.splice(i, 1);
    }
    this.tagName = this.selectQuestions.value.tag;
    var params = {
      tag: this.CorrectAnsArray
    }
    this.http.post('questions/getQueAsperTags', params).subscribe((res: any) => {
      this.questions = [];
      this.questions = res.data;
      for (var i = 0; i < this.questions.length; i++) {
        this.questions[i].isSelected = false;
        var check = this.id.includes(this.questions[i]._id);
        console.log(check);
        if (!check){
          (<FormArray>this.AddQuestions.get('Questions')).push(this.createOptionWithValue(this.questions[i]));
        }
      }
    })


  }
  onsubmitForQuestionAdd() {
    // console.log('before question add',this.testData);
    // console.log(this.AddQuestions.get('Questions').value);
  
      for (let i = 0; i < this.AddQuestions.get('Questions').value.length; i++) {    //console.log(this.AddQuestions.get('Questions').value[i])
        if (this.AddQuestions.get('Questions').value[i].isSelected) {
          var check = this.id.includes(this.AddQuestions.get('Questions').value[i]._id);
          console.log(check);
          if (!check) {
          this.testData.push({
            '_id': this.AddQuestions.get('Questions').value[i]._id,
            'questionText':this.AddQuestions.get('Questions').value[i].questionText,
            'rightMarks': this.AddQuestions.get('Questions').value[i].rightMarks,
            'worngMarks': this.AddQuestions.get('Questions').value[i].worngMarks
          });
          this.id.push(this.AddQuestions.get('Questions').value[i]._id);
        }
      }
      }   
    console.log(this.testData);
    console.log(this.id);
    this.Questioncount = this.testData.length;
    this.selectQuestions.reset();
this.AddQuestions.reset() ;
 }
  onSubmit(status) { 
    console.log(this.updateTest.value, this.testid);
   console.log(this.testData);
    this.updateTest.value.status = status;
    var updatedQuestions =[];
  for(let i =0; i<this.testData.length;i++)
  {
    updatedQuestions.push({'question' :this.testData[i]._id,
    'rightMarks' :this.testData[i].rightMarks, 
   'worngMarks': this.testData[i].worngMarks
   
  });
}
var params={
  'id':this.testid
}
  this.updateTest.value.questions = updatedQuestions
  this.http.put('testTemplet/updateTestTemplet',this.updateTest.value,params).subscribe((res : any)=>{
    console.log(res);
  
        if (res.message === 'Error') {
          console.log(res);
          this.toastr.error('Error Occure', 'Re-enter details');
        }
        if (res.message === 'Failed') {
          console.log(res);
          this.toastr.warning(res.message);
        }
        if (res.message === 'Success') {
          this.toastr.success(res.message, 'Record Updated Successfully');
     
        }
  });
    console.log(this.updateTest.value,updatedQuestions);
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
  close() {
    console.log(this.testData);
    for (let i = 0; i < this.testData.length; i++) {
      console.log(this.testData[i].rightMarks);
      this.totalMarks += +this.testData[i].rightMarks;
    }
    console.log(this.totalMarks);
    this.updateTest.patchValue({
      'totalScore': this.totalMarks,
      'count':this.testData.length
    });
    this.modalRef.hide();
  }
  deleteQuestions(id){


    Swal.fire({
      title: 'Are you sure To delete this question?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {


        for(let i =0; i<this.testData.length;i++)
        {
          if(this.testData[i]._id === id){
        this.testData.splice(i,1);
          }
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    console.log(id);
    console.log(this.testData)
  
  }

  editQuestion(id) {
    console.log(id);

    const initialState = {
      list: id,
      title: 'Modal with component'
    };
    this.modalRef = this.modalService.show(EditQuestionsComponent, { class: 'gray modal-lg', initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }
  selectAll(event) {
    console.log(event.target.checked);
      
    var question=(<FormArray>this.AddQuestions.get('Questions'));
    
    question.value.forEach(element => {
      element.isSelected = event.target.checked;
      console.log(element);
      this.selectedAll=event.target.checked;
     
    });
   
  }
}
