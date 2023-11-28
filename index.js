const https = require('https');
const fileUrl = 'https://cache.libria.fun/videos/media/ts/9564/1/1080/43b678140c847c6b3d1f79de685a0891.m3u8';
const {parse} = require('hls-parser');


https.get(fileUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    })

    response.on('end', () => {
        const playlist = parse(data);
        const totalDuration = playlist.segments.reduce((acc, segment) => acc + segment.duration, 0);
        console.log(totalDuration);
    })
}).on('error', (error) => {
    console.error('Произошла ошибка при чтении удаленного файла:', error);
  });