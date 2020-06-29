var Category= require('../models/Category');

async function up () {
  await Category.create({
    name: 'name',
    description: 'description'
  })
}

async function down () {
  await User.deleteOne({ name: 'name' });
}

module.exports = { up, down };
