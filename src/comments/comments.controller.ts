import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { User } from "../auth/decorators/user.decorator";
import { UserEntity } from "../auth/entities/user.entity";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  leaveComment(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: UserEntity,
  ) {
    return this.commentsService.leaveComment(createCommentDto, user.userId);
  }

  @Delete(":id")
  removeComment(@Param("id") id: string, @User() user: UserEntity) {
    return this.commentsService.removeComment(id, user.userId);
  }
}
