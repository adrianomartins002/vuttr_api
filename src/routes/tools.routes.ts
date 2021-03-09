import { Router, request } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateToolsService from '../services/CreateToolsService';
import SearchToolsService from '../services/SearchToolsService';
import ToolsRepository from '../repositories/ToolsRepository';
import TagsRepository from '../repositories/TagsRepository';
import Tools from '../models/Tools';


const toolsRouter = Router();


toolsRouter.post('/', async (request, response) => {
  try {
    const { title, link, description, tags } = request.body;

    const createTools = new CreateToolsService();

    const tools = await createTools.execute({ title, link, description, tags });

    return response.status(201).json(tools);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


toolsRouter.get('/', async (request, response) => {

  try {

    const searchToolsService = new SearchToolsService();

    const tools = await searchToolsService.execute(request.query.tag);

    return response.json(tools);
  } catch (err) {
    console.log("error:", err);
    return response.status(500).json({ error: err.message });
  }
});

toolsRouter.delete('/:id', async (request, response) => {

  if (!request.params.id)
    return response.status(400).json({
      message: "Está faltando o id"
    })

  try {

    const toolsRepo = getCustomRepository(ToolsRepository);
    toolsRepo.delete({
      id: Number(request.params.id)
    })

    return response.json({});
  } catch (err) {
    console.log("error:", err);
    return response.status(500).json({ error: err.message });
  }
});


export default toolsRouter;
