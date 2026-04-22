import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('consult')
  async ask(@Body() body: { prompt: string; context: string }) {
    return this.aiService.getConsult(body.prompt, body.context);
  }
}