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
# Screenshots
![Cap1](https://user-images.githubusercontent.com/47485363/87338763-f4e0a600-c545-11ea-8ee8-6ff9d04210f0.PNG)
![Cap2](https://user-images.githubusercontent.com/47485363/87338777-f9a55a00-c545-11ea-9d22-4ba4bd54be89.PNG)
![Cap3](https://user-images.githubusercontent.com/47485363/87338781-fc07b400-c545-11ea-9f52-5d4218d1e480.PNG)
![Cap4](https://user-images.githubusercontent.com/47485363/87338794-ff02a480-c545-11ea-9560-449642267a4c.PNG)
![Cap5](https://user-images.githubusercontent.com/47485363/87338806-032ec200-c546-11ea-8db4-efe68d89f837.PNG)
![Cap6](https://user-images.githubusercontent.com/47485363/87338821-075adf80-c546-11ea-8e00-84de946c61db.PNG)
![Cap7](https://user-images.githubusercontent.com/47485363/87338842-0de95700-c546-11ea-874e-405e632b17e6.PNG)
![Cap8](https://user-images.githubusercontent.com/47485363/87338855-12157480-c546-11ea-9cba-21dc3abd5987.PNG)
![Cap9](https://user-images.githubusercontent.com/47485363/87338877-1b064600-c546-11ea-826c-a1dfc396bab8.PNG)
![Capt10](https://user-images.githubusercontent.com/47485363/87338887-1f326380-c546-11ea-8e58-5b9053165742.PNG)
![Cap11](https://user-images.githubusercontent.com/47485363/87338900-2194bd80-c546-11ea-9f09-59498dce9432.PNG)



