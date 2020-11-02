const router = require('express').Router();
const { idValid, createArticleValid } = require('../middlewares/validation');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticleValid, createArticle);
router.delete('/:articleId', idValid, deleteArticle);

module.exports = router;
