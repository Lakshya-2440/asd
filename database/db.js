const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '..', 'db.json');

async function readDb() {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function writeDb(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  readDb,
  writeDb
};
