export class CreateSecondCommentDto {
  parentId: number;
  videoId: number;
  content: string;
  replayUserId: number;
}
