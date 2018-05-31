import { Header } from './../../constants/header';
import { StompService } from './../../services/stomp.service';
import { WebsocketComponent } from '../../websocket/websocket.component';
import { Component, OnInit, Input, EventEmitter} from '@angular/core';
import { StompConfig, StompState } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { webSocket } from 'rxjs/observable/dom/webSocket';
import { Message, Frame, StompHeaders } from '@stomp/stompjs';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-websocket-form',
  templateUrl: './websocket-form.component.html',
  styleUrls: ['./websocket-form.component.css']
})
export class WebsocketFormComponent implements OnInit {

  @Input() isConnected: boolean;
  @Input() stompConfig: StompConfig;

  public connectionHeaders: Header[];
  public stateString: Observable<string>;
  public sendTopic = '';
  public sendMessage = '';
  public subscribeTopic = '';

  constructor(private stompService: StompService, private messageService: MessageService) {
  }

  connect(): void {
    if (this.isConnected) {
      return;
    }
    const headers = {};
    this.connectionHeaders.forEach(connectionHeader => {
      if (connectionHeader.name && connectionHeader.value) {
        headers[connectionHeader.name] = connectionHeader.value;
      }
    });
    this.stompConfig.headers = headers;
    this.stompService.initAndConnect();
  }

  disconnect(): void {
    if (!this.isConnected) {
      return;
    }
    this.stompService.disconnect();
  }

  send(): void {
    if (!this.isConnected) {
      return;
    }
    this.stompService.publish(this.sendTopic, this.sendMessage);
    this.sendTopic = '';
    this.sendMessage = '';
  }

  subscribe(): void {
    if (!this.isConnected) {
      return;
    }
    this.stompService.subscribe(this.subscribeTopic);
    this.subscribeTopic = '';
  }

  ngOnInit() {
    this.connectionHeaders = [ new Header() ];
    this.stateString = this.stompService.state.pipe(
      map(((state: number) => StompState[state])));
  }

  addConnectionHeader(): void {
    this.connectionHeaders.push(new Header());
  }

  deleteConnectionHeader(index: number): void {
    if (this.connectionHeaders[index]) {
      this.connectionHeaders.splice(index, 1);
    }
  }
}
