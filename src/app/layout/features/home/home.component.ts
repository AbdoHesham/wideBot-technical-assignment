import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { ChatService } from './chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  messages: Message[] = [];
  uploadedFiles: any[] = [];
  formGroup: FormGroup;

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private ChatService: ChatService
  ) {}

  ngOnInit() {
    this.initForm();
    // this.ChatService.start();
  }

  initForm() {
    this.formGroup = new FormGroup({
      textInput: new FormControl(null, [Validators.required])
    });
  }

  sendMessage() {
    if (this.formGroup.valid && this.formGroup.controls['textInput'].value.trim()) {
      const userInput = this.formGroup.controls['textInput'].value;
      
      this.messages.push({ text: this.formGroup.controls['textInput'].value, sender: 'user' });
      let body = {
        'User Question': userInput,
      };
      this.ChatService.sendInbox(body).subscribe(data=>{
        // console.log(JSON.stringify( data))
        this.messages.push({ text: data, sender: 'bot' });

      })

      this.formGroup.reset(); // Reset the form
      // this.getBotResponse();
    }
  }

  getBotResponse() {
    setTimeout(() => {
      this.messages.push({ text: 'This is a bot response.', sender: 'bot' });
    }, 1000);
  }

  removeFile(file: any) {
    const index = this.uploadedFiles.indexOf(file);
    if (index >= 0) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {

      this.uploadedFiles.push(file);
    }
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}
