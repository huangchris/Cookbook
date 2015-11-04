# CookBook

[Heroku link][heroku]

[heroku]: http://www.recipe-book.net


Cookbooks is a site for family members to share traditional recipes or new favorites.

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create an account
- [X] Log in / Log out
- [X] Create / Join a family group
- [X] Create, read, edit recipes
- [X] Comment on recipes
- [X] Tag recipes with multiple tags and search by tag or by name
- [X] Make requests for other members to create recipes

###Server: Ruby on Rails with Postgres database.
* [DB schema][schema]
###Frontend: React.js views on Flux architecture
* Uses React Router to load various component modules, displaying
  relevant data to users.  Recipes and Recipe create/edit form are loaded
  in custom Modal.
* Recipes are filtered by owner (or a separate group of recipes that are
  shared among all users in group), and can be further filtered by recipe type
  (entree, side, dessert, etc.) as well as searched either by name or by
  user-designated tags.

### Features To Add
- [ ] Photo gallery per recipe
- [ ] Propose edits for Recipes, to merge/ replace, or shared ownership
- [ ] Changelogs for Recipes
- [ ] Multiple sessions
