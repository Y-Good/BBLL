import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) { }

    ///用户自定义标签
    createTag(tagName: string) {
        let tag = new Tag();
        tag.tag = tagName;
        return this.tagRepository.save(tag);
    }

    ///获取标签
    async findAllTag(ids?: number[]) {
        if (ids.length == 0) {
            return await this.tagRepository.find();
        }
        return await this.tagRepository.findByIds(ids);
    }

    ///删除标签---好像用不到
    removeTag() {

    }
}