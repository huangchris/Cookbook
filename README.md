# FresherNote

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

OurCookbook is a site for family members to share traditional recipes or new favorites.

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create / Join a family group
- [ ] Create, read, edit recipes
- [ ] Comment on recipes
- [ ] Tag recipes with multiple tags and search by tag or by name
- [ ] Make requests for other members to create recipes

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Rails server--database; User, Group, Recipe Models; user authentication, static pages (1 days)

Set up the Rails backend for basic requirements: setup tables, models for
users, groups, and recipes; controllers and views for user authentication.

Phase 1 features: user can create an account, log in / log out.

[Details][phase-one]

### Phase 2: JSON api and Flux/React views for users and groups (2 days)

After phase 2, a user should be able to create a family group, request to join
a group, and approve requests.  This will mean creating a JSON api on the backend,
setting up the Flux structure, and creating 2 React views, for creating/joining and
for managing a group.  I will also start using Bootstrap for basic styling.

Phase 2 features: Create / Join a family group

[Details][phase-two]

### Phase 3: Recipes (1 days)

Phase 3 features: Create, read, edit recipes

[Details][phase-three]

### Phase 4: Comments, Tags (2 days)

Add comment trees and tags to recipes.

Phase 4 features: Comment on recipes, Tag recipes with multiple tags and
search by tag or by name

[Details][phase-four]

### Phase 5: Requests (1 days)

Allow users to post a recipe request to the group, and other users to comment
or fulfill request.

Phase 5 features: Make requests for other members to create recipes

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

### Bonus Features (TBD
- [ ] Photo gallery per recipe
- [ ] Propose edits for Recipes, to merge/ replace.
- [ ] Changelogs for Recipes
- [ ] Email notifications
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
