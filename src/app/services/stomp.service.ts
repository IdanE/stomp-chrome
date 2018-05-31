import { TopicSubscription } from './../constants/topic-subscription';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { StompRService } from '@stomp/ng2-stompjs';
import { StompHeaders, Message } from '@stomp/stompjs';

@Injectable()
export class StompService extends StompRService {

  public headers: StompHeaders = {};
  public subscriptions: { [key: string]: TopicSubscription };
  public subscriptionsSubject: Subject<{ [key: string]: TopicSubscription }> = new Subject();

  constructor(private messageService: MessageService) {
    super();
    this.subscriptions = {};
  }

  initAndConnect() {
    super.initAndConnect();
    if (this.client.ws) {
      const eventListener = (event) => this.messageService.pushInboundMessage(event.data.replace(/(\r\n\t|\n|\r\t)/gm, ' '));
      this.client.ws.addEventListener('message', eventListener);
      this.client.ws.addEventListener('error', eventListener);
    }
  }

  publish(queueName: string, message: string, headers: StompHeaders = {}) {
    Object.assign(headers, this.headers);
    let headersString = '';
    Object.keys(headers).forEach(key => headersString += `${key}: ${headers[key]}`);
    this.messageService.pushOutboundMessage(`Sent '${message}' to topic ${queueName} with headers ${JSON.stringify(headers)}`);
    if (this.subscriptions[queueName]) {
      this.subscriptions[queueName].outboundCount += 1;
    }
    super.publish(queueName, message, headers);
  }

  subscribe(queueName: string, headers: StompHeaders = {}): Observable<Message> {
    if (this.subscriptions[queueName]) {
      return;
    }
    this.messageService.pushOutboundMessage(`Subscribing to topic ${queueName} with headers ${JSON.stringify(headers)}`);
    const subscription = super.subscribe(queueName, headers);

    this.subscriptions[queueName] = new TopicSubscription(queueName, subscription.subscribe(
      data => this.subscriptions[queueName].inboundCount += 1)
    );
    this.subscriptionsSubject.next(this.subscriptions);
    return subscription;
  }

  unsubscribe(queueName: string): void {
    if (!this.subscriptions[queueName]) {
      return;
    }
    this.subscriptions[queueName].subscription.unsubscribe();
    delete this.subscriptions[queueName];
    this.subscriptionsSubject.next(this.subscriptions);
    this.messageService.pushOutboundMessage(`Unsubscribing from topic ${queueName}`);

  }


}
