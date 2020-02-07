import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'ngx-p-login',
  templateUrl: './p-login.component.html',
  styleUrls: ['./p-login.component.scss']
})
export class PLoginComponent implements OnInit {
  items;
  checkoutForm; 
  submitted;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthServiceService) {
   this.checkoutForm = this.formBuilder.group({
     email: ['', Validators.required],
     password: ['', Validators.required],
   });
 }

 onSubmit() {
  this.submitted = true;

<<<<<<< HEAD
    this.authService.login(this.checkoutForm.value).subscribe((response: any) => {
      if (response.password === this.checkoutForm.value.password) {
        this.router.navigateByUrl('/pages');
      }else{
        this.toastrService.show('Please enter correct username or password', 'Error!', { status: 'danger' });
      }
=======
  //this.checkoutForm.reset();

  this.authService.login(this.checkoutForm.value).subscribe((response: any) => {
   alert(response);
>>>>>>> 8e85377947a4a5bcd032c81273f0bc40e7a34124
    });

  // stop here if form is invalid
  if (this.checkoutForm.invalid) {
      return;
  }
}

  ngOnInit() {
  }

}
