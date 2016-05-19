import {Component} from '@angular/core';
import {HorizonService} from './horizon.service';
@Component({
    selector: '<chat></chat>',
    template: `<h1>Messages</h1>
 + <StackLayout>
 +   <StackLayout>
 +    <TextField [(ngModel)]="newMessage"></TextField>
 +    <Button [text]="Send" (tap)="addMessage(newMessage)"></Button>
 +   </StackLayout>
 +  <GridLayout>
 +   <ListView [items]="messages" >
 +    <template let-item="item">
 +     <GridLayout>
 +      <Image height="50" width="50" src="message.avatar"></Image>
 +      <Label [text]="item.text"></Label>
 +      <Label [text]="item.datetime"></Label>
 +     </GridLayout>
 +    </template>
 +   </ListView>
 +  </GridLayout>
 +</StackLayout>
 `,

    providers: [HorizonService]
})

export class ChatComponent {
    newMessage;
    messages;
    constructor(private hs: HorizonService) {
        this.messages = [];
        this.newMessage = '';
        this.hs.getChats()
        .subscribe((newMessage)=>{
                this.messages = [...newMessage]
            });
    }
    
    addMessage(message){
this.hs.addMessage()
        .subscribe()
        this.newMessage = '';
        
    }
}