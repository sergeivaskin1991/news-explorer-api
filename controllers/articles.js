const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { ARTICLE_MISSING, ARTICLE_PERMISSION } = require('../errors/messageError');

// Получение всех статей
module.exports.getArticles = async (req, res, next) => {
  try {
    const article = await Article.find({ owner: req.user._id })
      .populate('owner');
    return res.send({
      data: article,
    });
  } catch (err) {
    return next(err);
  }
};

// Создание статей
module.exports.createArticle = async (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  try {
    const article = await Article.create({
      keyword, title, text, date, source, link, image, owner,
    });
    return res.send({
      data: article,
    });
  } catch (err) {
    return next(err);
  }
};

// Удаление статьи
module.exports.deleteArticle = async (req, res, next) => {
  // const { articleId } = req.params;
  const userId = req.user._id;
  try {
    const article = await Article.findById(req.params.articleId)
      .select('+owner')
      .orFail(() => new NotFoundError(ARTICLE_MISSING));

    if (userId !== article.owner.toString()) {
      throw new ForbiddenError(ARTICLE_PERMISSION);
    }
    await Article.deleteOne(article);
    return res.send(article);
  } catch (err) {
    return next(err);
  }
};
