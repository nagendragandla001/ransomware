import fs from 'fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

app.get('/records', async (req, res) => {
  const { currentPage, pageSize } = req.query;

  const recordsFileContent = await fs.readFile('./data/records.json');

  let records = JSON.parse(recordsFileContent);
  const newRecords = records.filter((record) => record.name.length > 0);

  const startingIndex = parseInt(currentPage * pageSize);
  const endIndex = startingIndex + parseInt(pageSize);

  const results = newRecords.slice(startingIndex, endIndex);

  res.json({
    records: results,
    total: newRecords.length,
  });
});

app.get('/records/:id', async (req, res) => {
  const { id } = req.params;

  const recordsFileContent = await fs.readFile('./data/records.json');

  let records = JSON.parse(recordsFileContent);
  const _record = records.find((record) => record.name.join('') === id);

  res.json({ record: _record });
});

app.put('/records/:id', async (req, res) => {
  const { id } = req.params;
  const { event } = req.body;

  if (!event) {
    return res.status(400).json({ message: 'Event is required' });
  }

  if (!event.microsoftDetectionName?.trim() || !event.extensions?.trim()) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const eventsFileContent = await fs.readFile('./data/records.json');
  const events = JSON.parse(eventsFileContent);

  const _event = events.find((e) => e.name.join('') === id);

  if (!_event) {
    return res.status(404).json({ message: 'Record not found' });
  }

  _event.extensions = event.extensions;
  _event.microsoftDetectionName = event.microsoftDetectionName;

  await fs.writeFile('./data/records.json', JSON.stringify(events));

  setTimeout(() => {
    res.json({ event: events });
  }, 1000);
});

app.delete('/records/:id', async (req, res) => {
  const { id } = req.params;

  const eventsFileContent = await fs.readFile('./data/records.json');
  const events = JSON.parse(eventsFileContent);

  const _events = events.filter((e) => e.name.join('') !== id);

  await fs.writeFile('./data/records.json', JSON.stringify(_events));

  setTimeout(() => {
    res.json({ message: 'Successfully Deleted!!' });
  }, 1000);
});

app.get('/', async (req, res) => {
  res.json('Hello Nagendra');
});

app.listen(3001, () => {
  console.log('Server is running on Port 3001');
});
