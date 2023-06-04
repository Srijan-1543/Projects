const { EnsureAuthenticated } = require('../config/auth');
const recipe_controller = require('../controllers/recipe_controller');

const router = require('express').Router();

router.post('/unsave',EnsureAuthenticated,recipe_controller.unSaveRecipe);
router.post('/removecomment',EnsureAuthenticated,recipe_controller.removeComment);
module.exports = router;