import { PickType } from "@nestjs/swagger";
import { Video } from "src/entities/video.entity";

export class CreateVideoDto  extends PickType(Video,['upId','url','cover','title','category'] as const){}
