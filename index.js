const aws = require('aws-sdk');
const fs = require('fs');

const rekognition = new aws.Rekognition({
    apiVersion: '2016-06-27',
    region: 'eu-west-1'
});

fs.readFile('IMG_20191123_121235.jpg', function(err, imageBytes) {
    if (err) throw err; // Fail if the file can't be read.
    rekognition.detectText({Image: {
        Bytes: imageBytes
    }}).promise()
        .then(response => console.log(response));
});


