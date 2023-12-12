import { Injectable } from "@nestjs/common";
import { CreateReplyDto } from "./dto/create-reply.dto";
import { UpdateReplyDto } from "./dto/update-reply.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ReplyService {
  constructor(private readonly prisma: PrismaService) {}
  async replyToComment(createReplyDto: CreateReplyDto, userId) {
    const reply = await this.prisma.reply.create({
      data: {
        userId,
        ...createReplyDto,
      },
    });

    return reply;
  }

  findAll() {
    return `This action returns all reply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return `This action removes a #${id} reply`;
  }
}
