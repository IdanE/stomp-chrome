import { TopicSubscription } from './../../constants/topic-subscription';
import { StompService } from './../../services/stomp.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-websocket-subscriptions',
  templateUrl: './websocket-subscriptions.component.html',
  styleUrls: ['./websocket-subscriptions.component.css']
})
export class WebsocketSubscriptionsComponent implements OnInit {

  @Input() isConnected: boolean;
  public subscriptions: TopicSubscription[];

  constructor(private stompService: StompService) {}

  public unsubscribe(topicSubscription: TopicSubscription): void {
    this.stompService.unsubscribe(topicSubscription.name);
  }

  ngOnInit() {
    this.stompService.subscriptionsSubject.subscribe((subscriptions => {
      this.subscriptions = Object.keys(subscriptions).map(key => subscriptions[key]);
    }));
  }

}
