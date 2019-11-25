const aws = require('aws-sdk');
const fs = require('fs');
const _ = require('lodash');

const rekognition = new aws.Rekognition({
    apiVersion: '2016-06-27',
    region: 'eu-west-1'
});

fs.readFile('IMG_20191123_121235.jpg', function(err, imageBytes) {
    if (err) throw err; // Fail if the file can't be read.
    rekognition.detectText({Image: {
        Bytes: imageBytes
    }}).promise()
        .then(response => {
            const lines = _.filter(response.TextDetections, testDetection => testDetection.Type ===  'LINE');
            _.forEach(lines, line => console.log(line.DetectedText));
        })
        .catch(err => console.error(err));
});


