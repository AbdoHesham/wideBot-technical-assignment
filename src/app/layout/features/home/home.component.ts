import { NgxPermissionsService } from 'ngx-permissions';
import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig} from 'primeng/api';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userInput: string = '';
  messages: Message[] = [];
  uploadedFiles: any[] = [];
  files = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;
  index: number = 0;
  constructor(private config: PrimeNGConfig, private messageService: MessageService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'user' });
      this.userInput = '';
      this.getBotResponse();
    }
  }

  getBotResponse() {
    setTimeout(() => {
      this.messages.push({ text: 'This is a bot response.', sender: 'bot' });
    }, 1000);
  }

  choose(event, callback) {
    callback();
}

onRemoveTemplatingFile(event, file, removeFileCallback, index:any) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
}

onClearTemplatingUpload(clear) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
}

onTemplatedUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
}

onSelectedFiles(event) {
    this.files = event.currentFiles;
    this.files.forEach((file) => {
        this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
}

uploadEvent(callback) {
    callback();
}

formatSize(bytes) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
}
}
