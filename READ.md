# Yalla-Tourism Backend API Features

All of the functionality below are fully implmented in this project.

### Tours
- List all bootcamps in the database
   * Pagination
   * Select specific fields in result
   * Limit number of results
   * Filter by fields
- Search tours by distance from specific cordinate by miles or kilometers
  
- Get single Tour
- Create new Tour
  * Authenticated users only
  * Must have the role "Lead-Guide" or "admin"
  * Field validation via Mongoose
- Upload a Coverphoto and 3 different photos for **Tours**
  * Photo will be uploaded to local filesystem
- Update **Tours**
  * Admin and lead-guide only
  * Validation on update
- Delete **Tours**
  * Admin and lead-guide only
- Calculate **Top-Five-Tours** according to Best **rating** ,less **price**

- Get **full statistics** (number of tours ,average rating ,avg price , min and max price , number of rates) about tours according to tour difficulty. 

- Calculate the average rating from the reviews for a tour

- Record tour locations to use it in creating map in mabbox
### Booking
- Create Checkout Session using Stripe 
- Book Tour 


### Reviews
- List all reviews for a tour
- List all reviews in general
  * Pagination, filtering, etc
- Get a single review
- Create a review
  * Authenticated users only.
  * Must have the role "user". 
- Update review
  * Authenticated users and admin
- Delete review
  * Authenticated users and admin

### Users & Authentication
- Authentication will be ton using JWT/cookies
  * JWT and cookie should expire in 30 days
- User registration
  * Register as a "user" or "lead-guide" or "guide"
  * Once registered, a token will be sent along with a cookie (token = xxx) 
    * send welcome email using sendgrid 
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
- User logout

- Get user
  * Route to get the currently logged in user (via token)
- Password reset (lost password)
  * User can request to reset password
  * The token will expire after 10 minutes
- Update user info
  * Authenticated user only
  * Separate route to update password
- User CRUD
  * Admin only
- Users can be made admin by protected route for admins only.

## Security
- Encrypt passwords and reset tokens
- Prevent NoSQL injections
- Add headers for security (helmet)
- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per hour.
- Protect against http param polution
- Use cors to make API public .

## Documentation
- Use Postman to create documentation
- Watch [API_Doc](https://documenter.getpostman.com/view/8810063/T17GgTbF?version=latest)


## Deployment (Heroku)
- Push to Github
- Clone repo on to server
- Watch project here [YallaTourism](https://yalla-tourism.herokuapp.com/)


## Reusable code

- NPM scripts for dev and production env
- Config file for important constants
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Use async/await (create middleware to clean up controller methods)
- Create a database seeder to import and destroy data

# Yalla-Tourism Front End Features

Using pug engine to render dynamic pages

## Available features

- Sign Up
- Login
- Get Available tours
- Get tour details
- Book Tour using stripe
- Account overview
- Update user setting
- Change password
- Upload photo for account


## Usage

Rename **config/config.env** to **config/.env** and update the values/settings to your own.

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run server
npm run watch:js

# Run in production
npm run build:js
```



