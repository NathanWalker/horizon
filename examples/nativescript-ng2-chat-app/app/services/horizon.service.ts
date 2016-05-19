var Horizon = require('@horizon/client/dist/horizon-dev');
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
const SERVER_URL = 'http://192.168.11.173:8181' //Using genymotion

@Injectable()
export class HorizonService {
    private horizon;
    private chat;
    private avatar_url = `http://api.adorable.io/avatars/50/${new Date().getMilliseconds()}.png`;
    constructor() {
        this.horizon = Horizon({ host: SERVER_URL });

        this.horizon.onReady()
            .subscribe(status => { console.log(status) })

        this.horizon.onDisconnected()
            .subscribe(status => { console.log(status) })

        this.horizon.onSocketError()
            .subscribe(status => { console.log(status) })

        this.chat = this.horizon('messages');
    }
    connect() {
        return this.horizon.connect();
    }

    getChats() {

        return this.chat
            .order('timeStamp', 'descending')
            .limit(10)
            .watch()

    }
    addMessage(text) {
        return this.chat
            .store({
                text: text,
                timeStamp: new Date(),
                avatar: this.avatar_url,
            });
    }
    getStatus() {
        return this.horizon.status();
    }

}