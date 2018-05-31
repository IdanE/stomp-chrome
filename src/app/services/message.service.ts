import { MessageType } from './../constants/message-type.enum';
import { Message } from './../constants/message';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Frame } from '@stomp/stompjs';

@Injectable()
export class MessageService {

  private messages: Message[] = [];
  private messagesSubject: Subject<Message> = new Subject();


  constructor() {}

  getMessages(): Observable<Message> {
    return this.messagesSubject;
  }

  pushInboundMessage(message: string): void {
    this.pushMessage({ data: message, type: MessageType.Inbound });
  }

  pushOutboundMessage(message: string): void {
    this.pushMessage({ data: message, type: MessageType.Outbound });
  }

  private pushMessage(message: Message): void {
    this.messagesSubject.next(message);
    this.messages.push(message);
  }



}
