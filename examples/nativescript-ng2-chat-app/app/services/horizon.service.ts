declare var Horizon: any;
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs';
const SERVER_URL = 'http://192.168.56.1:8181' //Using genymotion

@Injectable()
export class HorizonService {
    private horizon;
    private chat;
    avatar_url = `http://api.adorable.io/avatars/50/${new Date().getMilliseconds()}.png`;
    constructor() {
        this.horizon = Horizon({ host: SERVER_URL });
        this.chat = this.horizon("chat");
    }
    connect() {
        this.horizon.connect();
    }

    getChats(): Observable<any> {
        return this.chat()
            .order('timeStamp','decending')
            .limit(10)
            .watch()
            .map((res)=>{return res})
            .catch((e)=>{return Observable.throw(e.message)})
    }
    addMessage(text):Observable<any> {
        return this.chat.store({
            text: text,
            timeStamp: new Date(),
            avatar: this.avatar_url,
        })
        .map((res)=>{
            return res;
        })
        .catch((e)=>{
            return Observable.throw(e.message);
        })
    }

}