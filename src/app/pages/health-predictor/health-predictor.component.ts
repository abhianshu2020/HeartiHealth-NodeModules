import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HealthPredictorService } from '../../services/health-predictor/health-predictor.service';
import { NbDialogService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-health-predictor',
  templateUrl: './health-predictor.component.html',
  styleUrls: ['./health-predictor.component.scss']
})
export class HealthPredictorComponent implements OnInit {
  items;
  checkoutForm; 
  submitted = false;
  isHeartOK: Boolean;
  @ViewChild('dialog', {static: false}) resultDialog;

  loginDataOb: any;
  loginData: any;



  testLogin(){
    this.loginDataOb =  this.httpClient
    .get('http://ec2-52-201-229-245.compute-1.amazonaws.com:3000/api/User/abhishek.anshu%40pratian.com');

    alert(this.loginData);

    this.loginDataOb.subscribe((response: any) => {
      alert(response);
    });

  }

  constructor(private dialogService: NbDialogService, private formBuilder: FormBuilder,
     private healthPredictor: HealthPredictorService,private httpClient: HttpClient) {
    this.checkoutForm = this.formBuilder.group({
      age: ['', Validators.required],
      sex: ['', Validators.required],
      cp: ['', Validators.required],
      trestbps: ['', Validators.required],
      chol: ['', Validators.required],
      fbs: ['', Validators.required],
      restecg: ['', Validators.required],
      thalach: ['', Validators.required],
      exang: ['', Validators.required],
      oldpeak: ['', Validators.required],
      slope: ['', Validators.required],
      ca: ['', Validators.required],
      thal: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

     this.healthPredictor.getHeartPredictorResult(this.checkoutForm.value).subscribe((response: any) => {      
      if (response.Status === 200) {
        this.dialogService.open(this.resultDialog, { hasScroll: true });
        this.isHeartOK = !!response.Result;
        }
    });

    this.checkoutForm.reset();
   
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.checkoutForm.controls; }
}
