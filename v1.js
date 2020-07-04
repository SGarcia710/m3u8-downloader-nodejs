const { spawn } = require('child_process');

const args = process.argv.slice(2);

const link = args[0];
const videoName = args[1];
let progressCounter = 0;
var P = ['\\', '|', '/', '-'];

const videoDownload = spawn('ffmpeg', [
  '-i',
  link,
  '-c',
  'copy',
  `./Downloads/${videoName}.mp4`,
]);
console.log(`Download started`);

videoDownload.stdout.on('data', (data) => {});

videoDownload.stderr.on('data', (data) => {
  process.stdout.write('\r' + P[progressCounter++]);
  if (progressCounter === 4) {
    progressCounter = 0;
  }
});

videoDownload.on('error', (error) => {});

videoDownload.on('close', (code) => {
  console.log(`\nYor download has been finished`);
});
