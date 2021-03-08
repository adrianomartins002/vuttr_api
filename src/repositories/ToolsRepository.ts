import Tools from '../models/Tools';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(Tools)
class ToolsRepository extends Repository<Tools>{

  public async findByCategory(category: String): Promise<Array<Tools> | null> {

    const findTools = await this.find({
      where: {
        tags: category
      }
    })

    return findTools || null;
  }

}

export default ToolsRepository;
