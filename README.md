# Shopping

A full-stack E-commerce app to show products details and manage.
Built with a React frontend, Express/Node backend, MongoDB database.

---

## Demo Link
[Live Demo](https://neog-m-project-a-frontend.vercel.app/)

## Quick Start
```
git clone https://github.com/ok-avi/neog-MProject-a
cd neog-MProject-a/frontend
npm install
npm run dev

cd neog-MProject-a/backend
npm install
npm run dev
```
Create a ```.env``` file in ```/backend``` folder. Store important items in variable
- PORT
- MONGODB

## Technologies
- React JS, React Router
- Node.js, Express
- MongoDB, Mongoose
- Bootstrap

## Demo Video
Watch a 2 minute walkthrough of the app's main features.[Video Link](https://drive.google.com/file/d/1IRH9rR1o4gscL5gxpzYPv6-SbwCJoMui/view?usp=drive_link)

## Features

### Products
- filter and sort the products
- add and remove from cart and wishlist
- Visual representation of lead statuses

### Users
- view and change user's full information

## API Reference

### Products
GET ```/api/products/``` &rarr; get all products \
GET ```/api/products/:productId``` &rarr; get product by id \
GET ```/api/products/category/:categoryName``` &rarr; get category by id 

### Users
GET ```/api/user/:userId``` &rarr;  get all user by id   
GET ```/api/user/:userId/data``` &rarr;  get user data by id   

POST ```/api/user/wishlist``` &rarr;    add wishlist \
POST ```/api/user/add/cart``` &rarr;    add cart \
POST ```/api/user/add/order``` &rarr;    add order

POST ```/api/user/remove/wishlist``` &rarr;    remove wishlist
POST ```/api/user/remove/cart``` &rarr;    remove cart
POST ```/api/user/remove/order``` &rarr;    remove order

## Contact
For bugs or feature requests, please reach out to avi11574kumar@gmail.com
