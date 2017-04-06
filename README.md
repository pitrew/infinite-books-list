# Booklist

POC of one million books list.

## Prerequisites
* NodeJs v6.10.0 (check NVM: https://github.com/creationix/nvm)
* MongoDB database with data (default one is provided, check mlab.com)

## How to run
```bash
npm install
npm start
```
Open http://localhost:3000 in your browser.

## How to use
* To load more books scroll to the bottom of the page
* You can sort by book and author name clicking on column headers (Name or Author) 
* Clicking twice changes sort order from ascending to descending. The arrow will indicate the order.
* If you want to clear sort order click the column one more time
* If you want to filter books there are two filters available. Book genre and author gender. Select desired values from dropdown list
* If the book is of genre Finance and was published on the last Friday of the month it's marked with greenish background
* If the book is a Horror one and was published on Halloween it's marked with orange background

## Source code organisation
* `/public` - contains webpack generated data (under `js` folder) and index.html
* `/routes` - hapiJS routes, one for static content, one for `/` page and one for books api
* `/web` - client side code.
    * `/common` - actions, sagas, selectors and reducers
    * Files staring with capital letter are React components
* `index.js` - hapiJS server entrty point
* `config.js` - database configuration

## MongoDb
There is default db provided. It's hosted on mlab.com. If you want to create your own feel free to do so. There is a data generator here: https://github.com/pitrew/node-random-books-genrator-mongodb

*config.js*
```javascript
const config = {
	db = 'username:pass@db.mlab.com:51060/millionbooks',
};
```

## Licence
[MIT License](http://en.wikipedia.org/wiki/MIT_License)




