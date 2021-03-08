import { getRepository } from 'typeorm';
import Tags from '../models/Tags';

interface Request {
  name: string
}

class CreateTagService {

  public async execute(name: string): Promise<Tags> {
    try {

      const tagsRepository = getRepository(Tags);

      const checkTagExists = await tagsRepository.findOne({
        where: { name },
      });

      if (checkTagExists) {
        return checkTagExists;
      }

      const tags = tagsRepository.create({
        name
      });

      await tagsRepository.save(tags);

      return tags;
    } catch (error) {
      console.log("erro:", error.message);
      return new Promise(() => null);
    }

  }

}

export default CreateTagService;
