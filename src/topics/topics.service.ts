import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { PrismaService } from "nestjs-prisma";
import { Topic } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  async topicCreate(createTopicDto: CreateTopicDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        topics: {
          select: {
            createdAt: true,
          },
        },
      },
    });
    if (user.topics.length !== 0) {
      const lastTopicCreationDate = user.topics.slice(-1)[0].createdAt;
      const currentDate = new Date();
      const timeDiff = Math.floor(
        (currentDate.getTime() - lastTopicCreationDate.getTime()) / 1000,
      );
      if (timeDiff < 160) {
        throw new HttpException("Не прошло 2,67 минуты", HttpStatus.CONFLICT);
      }
    }

    return await this.prisma.topic.create({
      data: {
        userId,
        ...createTopicDto,
      },
    });
  }

  async topicFindAll() {
    return await this.prisma.topic.findMany();
  }

  async topicFindOne(id: string) {
    return await this.prisma.topic.findUnique({
      where: {
        id,
      },
    });
  }

  async updateTopic(
    id: string,
    updateTopicDto: UpdateTopicDto,
    userId: string,
  ): Promise<Topic> {
    try {
      const topic = await this.prisma.topic.findUnique({
        where: {
          id,
        },
      });

      if (!topic) {
        throw new NotFoundException(`Тема с ID ${id} не найдена`);
      }

      const updatedTopic = await this.prisma.topic.update({
        where: {
          userId,
          id,
        },
        data: {
          ...updateTopicDto,
        },
      });

      return updatedTopic;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        // Если ошибка связана с тем, что пользователь не имеет прав на обновление топика, выбрасываем конфликт исключение
        throw new ConflictException("Вы не можете изменить эту тему");
      }

      // Если ошибка не является известной, выбрасываем ее в виде обычного исключения
      throw error;
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
