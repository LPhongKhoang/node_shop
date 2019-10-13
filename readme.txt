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
