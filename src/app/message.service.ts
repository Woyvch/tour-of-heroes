import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  // A empty array of string
  messages: string[] = [];

  constructor() { }
  // Add a message to the array
  add(message: string) {
    this.messages.push(message);
  }
  // Clear the array of messages
  clear() {
    this.messages = [];
  }
}
