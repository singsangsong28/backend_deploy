import articleService from "../services/articleService.js";

async function getAll(req, res, next) {
  try {
    const getAllArticle = await articleService.getAll({
      ...req.body,
    });
    return res.status(200).json(getAllArticle);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const article = await articleService.getById(id);
    return res.json(article);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  const { userId } = req.auth;
  try {
    const createArticle = await articleService.create({
      ...req.body,
      ownerId: userId,
    });
    return res.status(201).json(createArticle);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const updateArticle = await articleService.update({
      id: req.params.id,
      ...req.body,
    });
    return res.json(updateArticle);
  } catch (error) {
    return next(error);
  }
}

async function deleteById(req, res, next) {
  try {
    await articleService.deleteById(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
