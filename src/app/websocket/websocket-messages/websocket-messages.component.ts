import { MessageType } from './../../constants/message-type.enum';
import { Message } from './../../constants/message';
import { StompService } from './../../services/stomp.service';
import { MessageService } from './../../services/message.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Frame } from '@stomp/stompjs';

@Component({
  selector: 'app-websocket-messages',
  templateUrl: './websocket-messages.component.html',
  styleUrls: ['./websocket-messages.component.css']
})
export class WebsocketMessagesComponent implements OnInit {

  public messages: Message[];

  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  public messageType = MessageType;

  constructor(private stompService: StompService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.messages = [];
    this.messageService.getMessages().subscribe(message => {
      this.messages.push(message);
      this.messagesContainer.nativeElement.scrollTop =  this.messagesContainer.nativeElement.scrollHeight;
    });
  }

}
