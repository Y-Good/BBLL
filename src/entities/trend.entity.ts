import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Time } from './base.entity';
import { User } from './user.entity';
import { Video } from './video.entity';

// @Entity()
class Trend extends Time {
  //   @PrimaryGeneratedColumn()
  id: number;

  user: User;
  follow: User;
  video: Video;
}
