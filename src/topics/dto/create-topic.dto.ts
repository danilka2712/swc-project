import { IsNotEmpty } from "class-validator";

export class CreateTopicDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
