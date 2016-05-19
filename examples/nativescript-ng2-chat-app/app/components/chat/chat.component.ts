import {Component, OnInit} from '@angular/core';
import {HorizonService} from '../../services/horizon.service';
@Component({
    selector: 'chat',
    templateUrl : 'components/chat/chat.component.html',
    providers: [HorizonService]
})

export class ChatComponent implements OnInit {
    newMessage;
    messages;
    constructor(private hs: HorizonService) {
        this.messages = [];
        this.newMessage = '';
    }

    ngOnInit() {
        this.hs.getChats()
            .subscribe((newMessage) => {
                this.messages = [...newMessage]
            }, (e) => {
                console.log(e.message)
            });
    }

    addMessage(message) {
        this.hs.addMessage(message)
            .subscribe(
            res => { console.log(res) },
            e => { console.log(e.message) }
            )
        this.newMessage = '';

    }
}