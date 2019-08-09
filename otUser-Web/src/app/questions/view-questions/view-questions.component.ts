import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EditQuestionsComponent } from '../edit-questions/edit-questions.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit {
  bsModalRef: BsModalRef;
  topic: any;
  selected: string;
  data = [];
  viewQuestion: FormGroup;
  question: any;

  constructor(private http: HttpService, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit() {
    this.http.get('subject/findSubject').subscribe((res: any) => {
      this.data = res.data;
    });
    this.viewQuestion = new FormGroup({
      subjectId: new FormControl('', Validators.required),
      topicId: new FormControl('', Validators.required),
    });

    this.http.get('questions/findQuestions').subscribe((res: any) => {
      this.question = res.data;
     
    });
  }

  typeHeadSelected(event) {
    console.log(event.item._id);
    var params = {
      subjectId: event.item._id
    }
    console.log(params);
    this.http.get('topic/findTopic', params).subscribe((res: any) => {
      this.topic = res.data;
     
     // console.log(this.question);
      this.http.get('questions/findQuestions').subscribe((res: any) => {
        this.question = res.data;
        console.log(this.topic);
        console.log(this.question);
        var selectedQuestion =[];
        for (var i = 0; i < this.topic.length; i++) {
          for (var j = 0; j < this.question.length; j++) {
            if (this.topic[i]._id == this.question[j].topicId){           
              selectedQuestion.push(this.question[j]);
            }
          }  
        }
        console.log(selectedQuestion);
        this.question = selectedQuestion;
        
      });
     
    });

    // this.http.get('questions/questionUsingSubjectId',params).subscribe((res: any) => {
    //   console.log(res);
    //   this.question = res.data;
    //   console.log('**********',this.question);
    // });
  }
  typeHeadSelectedTopic(event) {
    console.log(event);
    var params;
    if (typeof event == "string") {
      params = {
        'id': event
      }
    }
    else {
      params = {
        'id': event.item._id
      }
    }
    console.log(params);
    this.http.get('questions/findQuestions', params).subscribe((res: any) => {
      this.question = res.data;
      console.log(this.question);
    });
  }
  deleteQuestion(id) {
    console.log(id);
    this.http.delete('questions/deleteQuestion' + `/${id}`).subscribe((res: any) => {
      if (res.message === 'Error') {
        console.log(res);
        this.toastr.error('Error Occure', 'Re-enter details');
      }
      if (res.message === 'Failed') {
        console.log(res);
        this.toastr.warning(res.message);
        this.typeHeadSelectedTopic(res.data.topicId);
      }
      if (res.message === 'Success') {
        console.log(res);
        this.toastr.success(res.message, 'Record Deleted Successfully');
        console.log(res.data.topicId);
        this.typeHeadSelectedTopic(res.data.topicId);
        this. ngOnInit();
      }
    });

  }
  editQuestion(id) {
    console.log(id);

    const initialState = {
      list: id,
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(EditQuestionsComponent, { class: 'gray modal-lg', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }


}
