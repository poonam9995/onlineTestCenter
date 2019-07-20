import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/_shared/services/http/http.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  addSubject: FormGroup;
  public data;

  constructor(private http: HttpService) { }
  ngOnInit() {
    this.addSubject = new FormGroup({
      subjectName: new FormControl('', Validators.required),
    });

    this.http.get('subject/findSubject').subscribe((res: any) => {
      this.data = res.data;
      console.log(this.data);
    });
  }
  onSubmit() {
    console.log(this.addSubject.value);
    this.http.post('subject/addSubject', this.addSubject.value).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    });
  }
  deleteSubject(id) {
    console.log(id);
    this.http.delete('subject/removeSubject/' + `${id}`).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    });
  }

}
