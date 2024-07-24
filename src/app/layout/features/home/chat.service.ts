import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection!: HubConnection;
  SignalRURL: string='https://hook.eu2.make.com/f69m76okz68xq6vohr5lp45w9pmcxos2';

  constructor( private httpClient :HttpClient, ) { 
    this.connection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .withUrl(this.SignalRURL, {
      // withCredentials: true,
    })
    .build();
  }


start() {
  this.connection
    .start()
    .then(() => console.log('Connection started'))
    .catch((err) => console.error('Error while starting connection: ', err));

  this.connection.on('event', (data) => {
    console.log(data);

  });


}

sendInbox(body):Observable<any>{
  // this.connection.invoke('event',body)
  return this.httpClient.post<any>(this.SignalRURL,body).pipe(
    catchError((res)=> {
      console.log(res);
      
      return of(res.error.text)
    })
  )
}

}
