
import { PickType } from "@nestjs/mapped-types";
import { Tag } from "src/entities/tag.entity";
import { Video } from "src/entities/video.entity";

export class CreateVideoDto extends PickType(Video, ['user', 'url', 'cover', 'title', 'category'] as const) {
    tags: number[];
}
