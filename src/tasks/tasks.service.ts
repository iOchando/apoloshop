import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpCustomService } from 'src/shared/http/http.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly httpService: HttpCustomService) {}

  // @Cron('*/5 * * * * *')
  async handleCron() {
    this.logger.log('Called every 15 seconds');
    try {
      const params = { userId: '1234567890' };

      const response = await this.httpService.request({
        method: 'GET',
        url: 'http://localhost:3000/api/store',
        params,
      });

      const data = response.data;

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
