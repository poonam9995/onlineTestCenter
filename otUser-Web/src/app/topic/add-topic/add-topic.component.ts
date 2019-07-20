import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpService } from 'src/app/_shared/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {
  addTopic: FormGroup;
  public data;
  public topicData;
  public topic;
  bsModalRef: BsModalRef;
  public displayButton = false;
  public SubjectName;
  constructor(private http: HttpService, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit() {
    this.addTopic = new FormGroup({
      subjectId: new FormControl('', Validators.required),
      topicName: new FormControl('', Validators.required)
    });

    this.http.get('subject/findSubject').subscribe((res: any) => {
      this.data = res.data;
      console.log(this.data);
    });

    this.http.get('topic/findTopic').subscribe((res: any) => {
      console.log(res);
      this.topicData = res.data;
    });
  }
  onSubmit() {
    console.log(this.addTopic.value);
    this.http.post('topic/addTopic', this.addTopic.value).subscribe((res: any) => {
      if (res.message === 'Error') {
        console.log(res);
        this.toastr.error('Error Occure', 'Re-enter details');
      }
      if (res.message === 'Records not found') {
        console.log(res);
        this.toastr.warning(res.message);
      }
      if (res.message === 'Success') {
        console.log(this.addTopic.value.subjectId);       
        this.toastr.success(res.message, 'Record insert Successfully');
        this.displayTopic(this.addTopic.value.subjectId);       
      }
     
      this.addTopic.reset();
    });
  }

  displayTopic(event) {
   // console.log(event);
   this.SubjectName=event;
   var params;
    if(typeof event == 'string'){
      params = {
      subjectId : event
    }
    this.checkSubjectName(event);
  }else{
    console.log("event value",event.target.value);
     params = {
      subjectId : event.target.value
    }
    this.checkSubjectName(event.target.value);
  }
 
    this.http.get('topic/findTopic',params).subscribe((res: any) => {
      console.log(res);
       this.topic = res.data;
       
    });   
  
  }
  deleteTopic(id1) {
   
    this.http.delete('topic/removeTopic/' + `${id1}`).subscribe((res: any) => {
      
      if (res.message === 'Record Not Found') {
       
        this.toastr.warning(res.message);
      }
      if (res.massage == 'Success') {
        
        this.toastr.success(res.message, 'Record Deleted Successfully');
        this.displayTopic(res.data.subjectId);
      }
      
      //
      //this.ngOnInit();
    });
  }

  Edit(event, id) {
    console.log(id);
    var topicName = event.path[2].childNodes[1].outerText;
    console.log(event.path[2].childNodes[1].outerText);
    this.displayButton = true;
    var id1 = {
      id: id
    }
    var topic = {
      topicName: topicName
    }
    this.http.put('topic/updataTopic', topic, id1).subscribe((res) => {
         });
  }
  checkSubjectName(subject) {
  
    for(var i =0; i<this.data.length; i++)
    { 
      if(this.data[i]._id == subject)
      {  console.log("************",this.data[i].subjectName);
        this.SubjectName=this.data[i].subjectName;
      }
    }
   
  }
  
}
