import { Saveable } from './../constants/saveable';
import { StompService } from './../services/stomp.service';
import { Observable } from 'rxjs/Observable';
import { StompConfig, StompState } from '@stomp/ng2-stompjs';
import { Component, OnInit, KeyValueDiffer, KeyValueDiffers, DoCheck } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {

  public stompConfig: Saveable | StompConfig;

  private stompConfigDiffer: KeyValueDiffer<string, any>;

  public state: Observable<number>;

  public isConnected: boolean;

  constructor(private stompService: StompService, private differs: KeyValueDiffers) {
  }

  ngOnInit() {
    this.stompConfig = new StompConfig();
    this.stompConfigDiffer = this.differs.find(this.stompConfig).create();
    this.stompConfig.heartbeat_in = 0;
    this.stompConfig.heartbeat_out = 0;
    this.stompService.config = this.stompConfig;
    this.state = this.stompService.state.pipe(
      map(((state: number) => state)));
    this.state.forEach(state => {
      switch (state) {
        case StompState.CONNECTED: {
          this.isConnected = true;
          break;
        }

        default: {
          this.isConnected = false;
          break;
        }
      }
    });
  }

}
