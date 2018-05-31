import { StompService } from './services/stomp.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WebsocketFormComponent } from './websocket/websocket-form/websocket-form.component';
import { WebsocketMessagesComponent } from './websocket/websocket-messages/websocket-messages.component';
import { WebsocketComponent } from './websocket/websocket.component';
import { WebsocketSubscriptionsComponent } from './websocket/websocket-subscriptions/websocket-subscriptions.component';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    WebsocketFormComponent,
    WebsocketMessagesComponent,
    WebsocketComponent,
    WebsocketSubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ MessageService, StompService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
