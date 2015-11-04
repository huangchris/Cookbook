if User.find_by_name("Lauren Ipsum")
  user = User.find_by_name("Lauren Ipsum")
else
  user = User.create!(
    {email: "example@cookbook.com",
      password_digest: "$2a$10$WzXjGAQkYIuRXlNWdjV4eOxBFZ/z1AnGgrBU6VGKN87WmGN0UOM26",
      session_token: nil, name: "Lauren Ipsum",
      image: "http://res.cloudinary.com/dssjfjk9t/image/upload/v1445388889/fzg39hwaoaqtdhjzxuic.jpg"}
  )
end

UserGroup.create({user_id: user, group_id: 1, status: "admin"})

recipe = Recipe.create!(
  user_id: user.id, group_id: 1, personal: false,
  title: "Pumpkin Gingerbread",
  description: "Wonderfully flavorful and fragrant bread for the holidays.",
  photo: "http://res.cloudinary.com/dssjfjk9t/image/upload/v1446664642/xkhjchy5wq4bfwstkeqv.jpg"
  tab_tag_id: 5
)
recipe.ingredients.create!([
  {data: "3 cups sugar", ord: 1},
  {data: "1 cup vegetable oil ", ord: 2},
  {data: "4 eggs 2/3 cup water ", ord: 3},
  {data: "1 (15 ounce) can pumpkin puree ", ord: 4},
  {data: "2 teaspoons ground ginger ", ord: 5},
  {data: "1 teaspoon ground allspice ", ord: 6},
  {data: "1 teaspoon ground cinnamon ", ord: 7},
  {data: "1 teaspoon ground cloves ", ord: 8},
  {data: "3 1/2 cups all-purpose flour ", ord: 9},
  {data: "2 teaspoons baking soda ", ord: 10},
  {data: "1 1/2 teaspoons salt", ord: 11}
])
recipe.instructions.create!([
  {data: "Preheat oven to 350 degrees F (175 degrees C). Lightly grease two 9x5 inch loaf pans.", ord: 1},
  {data: "In a large mixing, combine sugar, oil and eggs; beat until smooth.
     Add water and beat until well blended. Stir in pumpkin, ginger, allspice cinnamon, and clove.", ord: 2},
  {data: "In medium bowl, combine flour, soda, salt, and baking powder.
    Add dry ingredients to pumpkin mixture and blend just until all ingredients are mixed.
    Divide batter between prepared pans.", ord: 3},
  {data: "Bake in preheated oven until toothpick comes out clean, about 1 hour.", ord: 4}
])

recipe = Recipe.create(
  user_id: user, group_id: 1, personal: true,
  title: "Pumpkin Pancakes",
  description: "You can use canned or cooked fresh pumpkin.",
  tab_tag_id: 5
)
recipe.ingredients.create!([
  {data: "1 1/2 cups milk", ord: 1},
  {data: "1 cup pumpkin pure", ord: 2},
  {data: "1 egg", ord: 3},
  {data: "2 tablespoons vegetable oil", ord: 4},
  {data: " 2 tablespoons vinegar", ord: 5},
  {data: " 2 cups all-purpose flour", ord: 6},
  {data: " 3 tablespoons brown sugar", ord: 7},
  {data: " 2 teaspoons baking powder", ord: 8},
  {data: " 1 teaspoon baking soda", ord: 9},
  {data: " 1 teaspoon ground allspice", ord: 10},
  {data: " 1 teaspoon ground cinnamon", ord: 11},
  {data: " 1/2 teaspoon ground ginge", ord: 12}
])

recipe.instructions.create!([
{data: "In a bowl, mix together the milk, pumpkin, egg, oil and vinegar. ",ord: 1},
{data: "Combine the flour, brown sugar, baking powder, baking soda, allspice, cinnamon, ginger and salt in a separate bowl. ",ord: 2},
{data: "Stir into the pumpkin mixture just enough to combine.",ord: 3},
{data: "Heat a lightly oiled griddle or frying pan over medium high heat. ",ord: 4},
{data: "Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. ",ord: 5},
{data: "Brown on both sides and serve hot.",ord: 6}
])

recipe = Recipe.create(
  user_id: user, group_id: 1, personal: false,
  title: "Cinnamon Pumpkin Waffles",
  description: "Serve with honey butter and maple syrup.",
  tab_tag_id: 1}
)
recipe.ingredients.create!([
  {data: "1 cup whole wheat flour ", ord: 1},
  {data: "1/4 cup wheat germ ", ord: 2},
  {data: "1/3 cup white sugar", ord: 3},
  {data: "1 teaspoon ground cinnamon ", ord: 4},
  {data: "1 teaspoon pumpkin pie spice ", ord: 5},
  {data: "1/2 teaspoon ground nutmeg ", ord: 6},
  {data: "1/2 teaspoon salt ", ord: 7},
  {data: "1 tablespoon baking powder ", ord: 8},
  {data: "3/4 cup milk ", ord: 9},
  {data: "1/2 cup pumpkin puree ", ord: 10},
  {data: "2 tablespoons melted butter ", ord: 11},
  {data: "2 tablespoons olive oil ", ord: 12},
  {data: "1/2 cup unsweetened applesauce ", ord: 13},
  {data: "1 egg, 1 egg white", ord: 14}
])

recipe.instructions.create!([
  {data: "Preheat a waffle iron according to manufacturer's instructions. ", ord: 1},
  {data: "Combine flour, wheat germ, sugar, cinnamon, pumpkin pie spice, nutmeg, salt, and baking powder in a bowl. Set aside.", ord: 2},
  {data: "Beat together milk, pumpkin puree, butter, oil, applesauce, whole egg, and egg white. ", ord: 3},
  {data: "Stir flour mixture into the pumpkin mixture along with the pecans.", ord: 4},
  {data: "Ladle the batter onto the preheated waffle iron. ", ord: 5},
  {data: "Cook the waffles until golden and crisp, 5 to 7 minutes.", ord: 6}
])

recipe = Recipe.create(
  user_id: user, group_id: 1, personal: true,
  title: "Pumpkin Smoothie",
  description: "Can add banana",
  tab_tag_id: 5
)

recipe.ingredients.create!([
{data: "1 (16 ounce) can pumpkin puree",ord: 1},
{data: "2 cups milk ",ord: 2},
{data: "1/4 cup brown sugar",ord: 3},
{data: "2 tsp ground cinnamon",ord: 4}
])

recipe.instructions.create!([
{data: "Place the pumpkin puree in a freezer bag; store in freezer for at least 24 hours.",ord: 1},
{data: "Heat the bag of pumpkin puree in the microwave on HIGH to soften, 1 to 2 minutes.",ord: 2},
{data: "Pour the milk into a blender. Add the brown sugar, cinnamon, and pumpkin; blend until smooth.",ord: 3}
])

# recipe = Recipe.create(
#   user_id: user, group_id: 1, personal: false,
#   title: "Cinnamon Pumpkin Waffles",
#   description: "Serve with honey butter and maple syrup.",
#   tab_tag_id: 1
# )
# recipe.ingredients.create!([
# ])
# recipe.instructions.create!([
# ])

SearchTag.create([
  {data: "soup"},
  {data: "quick"},
  {data: "easy"},
  {data: "dinner"},
  {data: "pasta"},
  {data: "cheese"},
  {data: "Ribs"},
  {data: "Chicken"},
  {data: "Baked"},
  {data: "Snickerdoodle"},
  {data: "Cookies"},
  {data: "Onion Rings"},
  {data: "Deep Fried"},
  {data: "Biscuits"},
  {data: "Food Lab"},
  {data: "Nachos"},
  {data: "Dips"}
])
TabTag.create([
  {data: "Entrees"},
  {data: "Side Dishes"},
  {data: "Appetizers"},
  {data: "Desserts"},
  {data: "Other"}
])
