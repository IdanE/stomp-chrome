import { Subscription } from 'rxjs/Subscription';
export class TopicSubscription {

    public name: string;
    public inboundCount = 0;
    public outboundCount = 0;
    public subscription: Subscription;

    constructor(name: string, subscription: Subscription) {
        this.name = name;
        this.subscription = subscription;
    }

}
