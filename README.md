## Makeshift CDN

Makeshift CDN is a simple API to host your own content whether that be an image, video, pdf, docfile, etc. On your own private server. It supports multi user by using accounts to store data for each individual seperately while at the same time maintaining security by implementing encryption. This API can be configured to support read-only so that other people may not use your API without permission or be opened to everyone. 
<hr>

**PATHS**

**GET** /register : Retrieves the token of a user. Requires `username` and `password` in raw body.

**POST** /register : Creates a new user. Requires `username` and `password` in raw body.

**DELETE** /register : Deletes a user and all data. Requires `username` and `password` in raw body.

**POST** /update/token : Updates the token for a user. Requires `username` and `password` in raw body.

**POST** /upload/single : Uploads a single file to the API. Requires `token` header. 

**GET** /file/:id : Retrieves the file list a user has. Requires `token` header.

**GET** /file/:id/:filename : Retrieves a file from the database.

<hr>

**ENV**

To host this on your own, simple clone the repository and create an env file with the following parameters:

    URI = mongodb://XXXXXXXXXXX0&authSource=admin&retryWrites=true&w=majority
    PORT = XXXX
    ALLOWWRITE = true
  
*If any of these env parameters are not provided, the API will NOT start or default to read-only.*

The `URI` will be the connection URL to your mongoDB database and the `ALLOWWRITE` parameter will decide if other users may create a user on your client. Make sure you choose Node.JS version 2.2.12 or later in the MongoDB atlas or it won't connect.
<hr>

**File Restrictions**

To improve security, you can configure what types of files are allowed to be uploaded in to the API. To change this, simply open `restrictedFile.json` in the root directory of the API, the add or delete extensions to your liking. However, I do recommend that you don't leave this empty since certain file types may be harmful. The following are an example of how your json file should look like.

    [
	    "BAT",
	    "CMD,
	    "VB",
	    "VBS"
    ]
<hr>

