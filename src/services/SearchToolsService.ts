import { getCustomRepository, getRepository } from 'typeorm';
import Tools from '../models/Tools';
import TagsService from '../services/CreateTagService';
import AppError from '../errors/AppError';
import Tags from '../models/Tags';
import ToolsRepository from '../repositories/ToolsRepository';
import TagsRepository from '../repositories/TagsRepository';
import { Request } from 'express';


class SearchToolsService {

  public async execute(tag: any): Promise<Array<Tools> | null> {

    const toolsRepository = getCustomRepository(ToolsRepository);
    const tagRepository = getCustomRepository(TagsRepository);
    let tools: Array<Tools> = [];
    if (tag) {
      const tagQuery = String(tag);
      const tagSearched = await tagRepository.find({ where: { name: tagQuery } });

      if (tagSearched.length > 0) {
        tools = await toolsRepository.
          createQueryBuilder('tools').
          innerJoin('tools.tags', 'tags').
          where('tags.id=:id', { id: tagSearched[0].id }).getMany();

        let ids: number[] = [];

        for (let i = 0; i < tools.length; i++) {
          ids.push(tools[i].id);
        }

        const toolsWithTags = await toolsRepository
          .createQueryBuilder('tools').
          innerJoinAndSelect('tools.tags', 'tags').
          where('tools.id IN(:...ids) ', { ids }).getMany();

        const newTools = this.tratmentOfTools(toolsWithTags);
        return newTools;
      } else {
        return [];
      }
    } else {

      tools = await toolsRepository.find();

      let ids: number[] = [];

      for (let i = 0; i < tools.length; i++) {
        ids.push(tools[i].id);
      }

      if (ids.length === 0)
        return [];

      const toolsWithTags = await toolsRepository
        .createQueryBuilder('tools').
        innerJoinAndSelect('tools.tags', 'tags').
        where('tools.id IN(:...ids) ', { ids }).getMany();

      const newTools = this.tratmentOfTools(toolsWithTags);
      return newTools;
    }
  }


  public tratmentOfTools(tools: Array<Tools>) {


    const newTools: Array<any> = [];

    tools.forEach(tool => {
      let tags: Array<any> = [];
      for (const tag of tool.tags) {
        tags.push(tag.name);
      }

      newTools.push({
        ...tool,
        tags: tags
      })
    })

    return newTools;
  }
}

export default SearchToolsService;
