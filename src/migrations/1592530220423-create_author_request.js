var AuthroRequest = require('../models/AuthorRequest');
async function up () {
  await AuthroRequest.create({
    email2: 'email2',
    professionalCard: 'professionalCard',
    employmentHistory: 'employmentHistory',
    academicHistory: 'academicHistory'
  })
}

async function down () {
  await AuthroRequest.deleteOne({ userId: 'userId' });
}

module.exports = { up, down };

