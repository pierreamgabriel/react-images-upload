# React Images Upload
This is a React component to upload images. It's easy to use, and it comes with a PHP script to handle the back-end logic.

## Installation
Copy the lib folder and the ImageUpload.js and ImageUpload.css files to the src folder of your project. Copy the upload.php file to the public folder. Create a folder called uploads inside the public folder.

Install dependencies:

```bash
npm install axios @mui/material @emotion/react @emotion/styled
```
## Usage
Import the component in your code:

```javascript
import ImageUpload from './ImageUpload';
```
### How does it work?
It copies any jpg or png image to the uploads folder, and it adds the image URL to the imgList variable in the order it was uploaded. It also shows a preview of all images uploaded with an edit and delete button.

### What do I do with the URL list in the imgList variable?
You save the URLs in your database. You'll need to change the code a bit to add your logic.

### How can I apply different styles?
You can freely change the code and apply the styles you want.  

### Does it delete and replace images as well?
It does, but it won't delete the actual images inside the uploads folder. It'll just update the URL list. 

### How can I upload images to a different folder?
You need to change the upload.php file.
