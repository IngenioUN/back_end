var User = require('../models/Category');

async function up () {
  await User.create({
    title: 'title',
    abstract: 'abstract',
    keyWords: 'keywords',
    text: 'text'
  })
}

async function down () {
  await Publication.deleteOne({title: 'title'})
}

module.exports = { up, down };
