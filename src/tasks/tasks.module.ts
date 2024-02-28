import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { HttpCustomModule } from 'src/shared/http/http.module';

@Module({
  imports: [HttpCustomModule],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
