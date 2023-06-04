const router = require('express').Router();
const { EnsureAuthenticated } = require('../config/auth');
const recipe_controller = require('../controllers/recipe_controller');

router.get('/list',recipe_controller.getRecipeList);
//router.get('/?id='+8138,recipe_controller.getRecipe);
router.get('/:id',recipe_controller.getRecipeDetails);
router.get('/',recipe_controller.getHome);
router.post('/save',EnsureAuthenticated,recipe_controller.saveRecipe);
router.post('/comment',EnsureAuthenticated,recipe_controller.createComment);

module.exports = router;