import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello! Please navigate to http://localhost:3001/api to see the API Docs';
  }
}
