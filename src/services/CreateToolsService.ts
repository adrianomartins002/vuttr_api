import { getRepository } from 'typeorm';
import Tools from '../models/Tools';
import TagsService from '../services/CreateTagService';
import AppError from '../errors/AppError';
import Tags from '../models/Tags';

interface Request {
  title: string;
  link: string;
  description: string;
  tags: Array<string>;
}

class CreateToolsService {

  public async execute({ title, link, description, tags }: Request): Promise<Tools> {
    const toolsRepository = getRepository(Tools);

    const checkToolsExists = await toolsRepository.findOne({
      where: { title },
    });

    if (checkToolsExists)
      throw new AppError('Tools already exists.');


    const newTags = await this.resolveTags(tags);


    const tools = toolsRepository.create({
      title,
      link,
      description
    });

    tools.tags = newTags;


    await toolsRepository.save(tools);

    return tools;
  }

  public async resolveTags(tags: Array<string>) {
    const tagsService = new TagsService();
    let tagsT: Array<Tags> = [];

    for (let i = 0; i < tags.length; i++) {
      const newTag = await tagsService.execute(tags[i]);
      tagsT.push(newTag);
    }

    return tagsT;
  }

}

export default CreateToolsService;
