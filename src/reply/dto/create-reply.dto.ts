import { IsNotEmpty } from "class-validator";

export class CreateReplyDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  commentId: string;
}
