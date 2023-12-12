import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PrismaService } from "nestjs-prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Comment } from "@prisma/client";

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async leaveComment(createCommentDto: CreateCommentDto, userId) {
    try {
      const urlRegex = /https?:\/\/[\w-\.]+/g;
      const urlDomainRegex = /\b\w+\.\w{2,}\b/g;
      if (
        createCommentDto.text.match(urlRegex) ||
        createCommentDto.text.match(urlDomainRegex)
      ) {
        throw new ConflictException("Ссылки в комментариях запрещены");
      }

      const comment = await this.prisma.comment.create({
        data: {
          userID: userId,
          ...createCommentDto,
        },
      });
      return comment;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ConflictException("Ошибка в создание комментария");
      }

      throw error;
    }
  }

  async removeComment(id: string, userId): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id,
        },
      });
      if (!comment) {
        throw new HttpException(
          `Комментария под ${id}, не существует`,
          HttpStatus.CONFLICT,
        );
      }
      const deleteComment = await this.prisma.comment.delete({
        where: {
          userID: userId,
          id,
        },
      });
      return deleteComment;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ConflictException("Вы не можете удалить комментарий");
      }

      throw error;
    }
  }
}
