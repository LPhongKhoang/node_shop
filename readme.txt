======= Project on Academind youtube ==
0. User pattern:
  "email": "pkpro2@gmail.com",
	"password": "pkpw2pro"
0. Token:
token: amdin:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdkZGQxM2VlODk5NzI0NThhZGQ4ZGUiLCJlbWFpbCI6InBrcHJvQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2ODUyOTcwOSwiZXhwIjoxNTY4NTMzMzA5fQ.F4UZnZVNemuDP-Q5l8CEQ_Ao9S60C0sapqdWcKwH_14
token: for u2
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdkYTI2OTg1ZDBmZjBlOTg3ZGExNzMiLCJlbWFpbCI6InBrcHJvMkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY4NTI5NDQ4LCJleHAiOjE1Njg1MzMwNDh9.vpdSQ4jjlb9msWGlxIuF5xhc6MJpysirC7QQ3EAkLEo
I. Parsing the body & Handling Cors
  1. "body-parser" can be use alternatively for "express"
  2. "Cors" (Cross Origin Resources Sharing)
    (see in notebook "codelearn")
  3. File upload: (i.e: product creation form ("name" string, "price" number, "product imag" file))
    + Use "multer" to parse form data to Js Object
    + See in code to know "how to using it" or see in the docs "https://www.npmjs.com/package/multer"

    + I.E: up image file with name: 'mackbookpro2016.jpg'
      -> req.file: 
          File:   { fieldname: 'productImg',
                    originalname: 'macbookpro2016.jpg',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    destination: 'public/images',
                    filename: '1570877509188macbookpro2016.jpg',
                    path: 'public\\images\\1570877509188macbookpro2016.jpg',
                    size: 8759
                  }
    + Up file to AWS-S3: 
    {
      "fieldname": "productImg",
      "originalname": "iphone_xs_max.jpg",
      "encoding": "7bit",
      "mimetype": "image/jpeg",
      "size": 77234,
      "bucket": "node-rest-shop-image",
      "key": "1571468893012_iphone_xs_max.jpg",
      "acl": "public-read",
      "contentType": "application/octet-stream",
      "contentDisposition": null,
      "storageClass": "STANDARD",
      "serverSideEncryption": null,
      "metadata": {
          "fieldName": "Testing Metadata"
      },
      "location": "https://node-rest-shop-image.s3.ap-southeast-1.amazonaws.com/1571468893012_iphone_xs_max.jpg",
      "etag": "\"2bbe8376b608bb681fb6680dd05a4de3\""
    }
    + mimetype: image/jpeg, image/png, video/x-m4v, video/mp4

    4. use putObject or upload method of s3 helper object (aws.S3())

    
  + use Reader for convert file to Base 64 data format ("data:image/png;base64,....")
  + use Buffer to convert base64 data to <Binary String>
    >> const buf = Buffer.from(req.body.fileInBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");
  + use putObject or upload methodd of aws.S3() to up file to S3
        s3.putObject({
          Body: buf,
          ContentType: "image/png",
          Key: "time.png",
          Bucket: config.get("s3.Bucket")
        }, (err, data) => {
          if (err) { 
            console.log(err);
            console.log('Error uploading data: ', data); 
            res.status(500).send("error");
          }
          else res.send({ data });
      });

  
