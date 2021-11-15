REST API for a kind of self managed google drive

## Getting started

- Clone the repo
- Run `yarn install`
- Set your `.env`
- Build `yarn build`
- Start with `yarn start`


### Usage example
send a GET request to `/`
if the directory you set is empty it will return
```json
{
  "directories": [],
  "files": []
}
```
if is not empty then you'll see what other directories and files are available

if you send a GET request to the path of a file, you'll get the file

if you send a POST request and the request doesn't include a file, a new folder will be created in that path

if you send a POST request and the request does include a file, the file will be stored at that path

if you send a DELETE request to any path, the resource at that path will be deleted