const { spawn } = require('child_process');
const readline = require('readline');

let progressCounter = 0;
var progressSprites = [
  '🕐',
  '🕑',
  '🕒',
  '🕓',
  '🕔',
  '🕕',
  '🕖',
  '🕗',
  '🕘',
  '🕙',
  '🕚',
  '🕛',
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Video's link 🔗: ", function (link) {
  rl.question("Video's name 📼: ", function (videoName) {
    rl.close();

    console.log(`\nDownloading `);

    const videoDownload = spawn('ffmpeg', [
      '-i',
      link,
      '-c',
      'copy',
      `./downloads/${videoName}.mp4`,
    ]);

    videoDownload.stdout.on('data', (data) => {});
    videoDownload.stderr.on('data', (data) => {
      process.stdout.write('\r' + progressSprites[progressCounter++]);
      if (progressCounter === progressSprites.length) {
        progressCounter = 0;
      }
    });
    videoDownload.on('error', (error) => {});
    videoDownload.on('close', (code) => {
      console.log(`\nYor download has been finished ✅`);
    });
  });
});
