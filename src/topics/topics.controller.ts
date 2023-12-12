import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TopicsService } from "./topics.service";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { User } from "../auth/decorators/user.decorator";
import { UserEntity } from "../auth/entities/user.entity";

@Controller("topic")
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post("new")
  create(@Body() createTopicDto: CreateTopicDto, @User() user: UserEntity) {
    return this.topicsService.topicCreate(createTopicDto, user.userId);
  }

  @Get()
  findAll() {
    return this.topicsService.topicFindAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.topicsService.topicFindOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTopicDto: UpdateTopicDto,
    @User() user: UserEntity,
  ) {
    return this.topicsService.updateTopic(id, updateTopicDto, user.userId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.topicsService.remove(+id);
  }
}
