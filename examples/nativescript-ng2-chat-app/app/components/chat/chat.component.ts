import {Component, OnInit} from '@angular/core';
import {HorizonService} from '../../services/horizon.service';
import {Http} from '@angular/http'
@Component({
    selector: 'chat',
    templateUrl: 'components/chat/chat.component.html',
    providers: [HorizonService]
})

export class ChatComponent implements OnInit {
    newMessage;
    messages;
    constructor(private hs: HorizonService, private http: Http) {
        this.messages = [];
        this.newMessage = '';
    }

    ngOnInit() {
        this.hs.getChats()
            .subscribe((newMessage) => {
                this.messages = [...newMessage];
            },
            error => { console.log(error) })
    }

    addMessage(message) {
        this.hs.addMessage(message)
            .subscribe((res) => {
                console.log(res);
                console.log(`Adding new message:`);
                console.log(this.newMessage);
                
            },
            error => { console.log(error) })
        this.newMessage = '';

    }
}