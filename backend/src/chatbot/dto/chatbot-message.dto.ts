import { IsNotEmpty, IsString } from 'class-validator';

export class ChatbotMessageDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
