import Tags from '../models/Tags';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(Tags)
class TagsRepository extends Repository<Tags>{

  public async findByName(name: string): Promise<Array<Tags> | null> {

    const findTags = await this.findByName(name);

    return findTags || null;
  }

}

export default TagsRepository;
