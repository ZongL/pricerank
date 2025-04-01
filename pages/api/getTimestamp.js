// pages/api/getTimestamp.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'tesla_patents_data_ai.json');
  const stats = fs.statSync(filePath);

  if (stats.isFile()) {
    const timestamp = stats.mtime.getTime();
    res.status(200).json({ timestamp });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
}