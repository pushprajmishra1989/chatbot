import { Component } from '@angular/core';
import { ChatBotService } from '../chatbotservice';



@Component({
  selector: 'chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  newMessage : string = '';
  // botResponse: string = '';
  userMessages: any[] = [];
  // botResponses: string[] = [];
    constructor(private chatbotService: ChatBotService) {}

    sendMessage() {
      // Construct the payload with the message field
      const payload = { message: this.newMessage  };

      if (this.newMessage.trim() !== '') {
        this.userMessages.push({message :this.newMessage,type :'que'});
        // Simulate bot response (replace this with actual bot logic)
        // this.botResponses.push("Bot: I received your message");
        this.newMessage = '';
      }
  
      // Send the payload to the chatbot service
      this.chatbotService.sendMessage(payload).subscribe(response => {
        // Update botResponse with the response from the API
        this.userMessages.push({message :response.response,type :'ans'} );
      });
  
      // Clear input field after sending message
      this.newMessage  = '';
    }
  }

