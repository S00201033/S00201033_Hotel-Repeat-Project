import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  title = 'nodeMailerApp';
  nodeMailerForm!: FormGroup;
  constructor(private formBuilder:FormBuilder, private emailService:EmailService) { }

  ngOnInit(): void {
    this.nodeMailerForm = this.formBuilder.group({
      email:[null,[Validators.required]],
      subject:[null,[Validators.required]]

    });
  }

  sendMail(){
    let email = this.nodeMailerForm.value.email;
    let subject = this.nodeMailerForm.value.subject;

    let reqObj = {
      email:email,
      subject:subject
    }
    this.emailService.sendMessage(reqObj).subscribe(data=>{
      console.log(data);
    })
    alert("Email Sent!")

  }

}
