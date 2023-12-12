import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReplyService } from "./reply.service";
import { CreateReplyDto } from "./dto/create-reply.dto";
import { UpdateReplyDto } from "./dto/update-reply.dto";
import { User } from "../auth/decorators/user.decorator";
import { UserEntity } from "../auth/entities/user.entity";

@Controller("reply")
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  replyToComment(
    @Body() createReplyDto: CreateReplyDto,
    @User() user: UserEntity,
  ) {
    return this.replyService.replyToComment(createReplyDto, user.userId);
  }

  @Get()
  findAll() {
    return this.replyService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.replyService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.replyService.update(+id, updateReplyDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.replyService.remove(+id);
  }
}
