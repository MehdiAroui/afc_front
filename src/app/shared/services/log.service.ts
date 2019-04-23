import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  logs: string[] = [];

  add(message: string) {
    this.logs.push(message);
  }

  clear() {
    this.logs = [];
  }
}