// const _ = require('lodash')
// var AWS = require('aws-sdk')
// const awsConfig = require('../config/aws');

const multer = require("multer");
const fs = require("fs");
const path = require("path");

// module.exports ={

//     updloadSingleFileToS3: async(req, res) => {
//         const s3 = new AWS.S3({
//             accessKeyId: awsConfig.accessKeyId,
//             secretAccessKey: awsConfig.secretAccesskey,
//             AWS_S3_FILE_OVERWRITE : false
//         });

//         // Binary data base64
//         let {data, name } = req.files.file
//         let workspaceId = "testworkspace"

//         const fileContent  = Buffer.from(data, 'binary');
//         let key = `workspace/${workspaceId}/${new Date().getTime()}${name}` // File name you want to save as in S3
//         const dev = process.env.NODE_ENV !== 'production'
//         if(dev){
//             key = `dev/workspace/${workspaceId}/${new Date().getTime()}${name}` // File name you want to save as in S3
//         }

//         const params = {
//             Bucket: awsConfig.bucketName,
//             Key: key,
//             Body: fileContent
//         };

//         // Uploading files to the bucket
//         s3.upload(params, function(err, data) {
//             if (err) {
//                 return res.apiError("File upload failed!")
//             }
//             return res.apiSuccess({imageUrl : data.Location})
//         });
//     },

// }

// module.exports = {
//   uploadFile: async (req, res) => {
//     try {
//       // let { imageSeriesId = "test", storageLocation = "" } = req.body;
//       let imageSeriesId = "test";
//       let storageLocation = "";
//       // Ensure the directory exists
//       const uploadPath = path.join(
//         __dirname,
//         `../upload/${imageSeriesId}/${storageLocation}`
//       );
//       fs.mkdirSync(uploadPath, { recursive: true });

//       // // Set up Multer storage
//       const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, uploadPath);
//         },
//         filename: function (req, file, cb) {
//           cb(null, file.originalname);
//         },
//       });

//       // // Multer upload
//       const dynamicUpload = multer({ storage: storage }).single("file");
//       dynamicUpload(req, res, function (err) {
//         if (err) {
//           return res.status(500).send(err.message);
//         }
//         res.send("File uploaded successfully.");
//       });
//     } catch (error) {
//       res.status(500).send(`Error during file upload: ${error.message}`);
//     }
//   },
// };

module.exports = {
  uploadFile: async (req, res) => {
    if (req.file) {
      const filePath = req.file.path;
      console.log("Uploaded file path:", filePath);

      // Your additional logic here
      res.send(`File uploaded successfully. Path: ${filePath}`);
    } else {
      res.status(400).send("No file uploaded.");
    }
  },
};
