Group.create!([
  {name: "Ipsum Family"}
])
Ingredient.create!([
  {recipe_id: 1, data: "Var 1", ord: 1},
  {recipe_id: 1, data: "Var 2", ord: 2},
  {recipe_id: 4, data: "This was long", ord: 1}
])
Instruction.create!([
  {data: "Fun1", ord: 1, recipe_id: 1},
  {data: "Fun2", ord: 2, recipe_id: 1},
  {data: "1", ord: 1, recipe_id: 4}
])
Recipe.create!([
  {user_id: 1, group_id: 1, personal: false, title: "Test", photo: "", description: "!Personal, ING 2, INST 2, !pic, Cat: 2, 2 Tag", tab_tag_id: 2},
  {user_id: 1, group_id: 1, personal: false, title: "length test", photo: "", description: "1", tab_tag_id: 1}
])
RecipeSearchTag.create!([
  {search_tag_id: 1, recipe_id: 1},
  {search_tag_id: 2, recipe_id: 1},
  {search_tag_id: 3, recipe_id: 1},
  {search_tag_id: 4, recipe_id: 4}
])
SearchTag.create!([
  {data: "Aaaaa"},
  {data: "bBBB"},
  {data: "CCC"},
  {data: "1"}
])
TabTag.create!([
  {data: "1"},
  {data: "2"},
  {data: "3"},
  {data: "4"}
])
User.create!([
  {email: "example@cookbook.com", password_digest: "$2a$10$FC3ZVRhvA9gk4Wqgr26e6OBo1uCE1Eys3Tv0fn36B2CiHBsZx.I3a", session_token: "ZyMAlhU_zjmvH-wsemo30w", name: "Lauren Ipsum", image: "http://res.cloudinary.com/dssjfjk9t/image/upload/v1445386009/dfts9exikugczvwtkf0h.jpg"}
])
UserGroup.create!([
  {user_id: 1, group_id: 1, status: "admin"}
])
