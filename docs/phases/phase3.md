# Phase 3: Recipes (1 days)
Phase 3 features: Create, read, edit recipes

## Rails
### Models
* Recipe

### Controllers
* Api::RecipesController (create, destroy, index, show, update)

### Views
* recipes/index.json.jbuilder
* recipes/show.json.jbuilder

## Flux
### Views (React Components)
* RecipesIndex
  <!-- - RecipesIndexItem ?-->
  - RecipesDetail
* RecipesForm

### Stores
* Recipe

### Actions
* ApiActions.receiveAllRecipes
* ApiActions.receiveSingleRecipe
* ApiActions.deleteRecipe

### ApiUtil
* ApiUtil.fetchAllRecipes
* ApiUtil.fetchSingleRecipe
* ApiUtil.createRecipe
* ApiUtil.editRecipe
* ApiUtil.destroyRecipe

## Gems/Libraries
