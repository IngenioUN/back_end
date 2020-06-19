var Publication = require('../models/Publication');

async function up () {
  await Publication.create({
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

