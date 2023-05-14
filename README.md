
# MERN Authentication System


This repository contains a MERN stack authentication system that allows users to register for an account, login with their credentials, and perform various authentication-related tasks. The system includes a backend API built with Node.js and Express that handles user authentication and data storage in MongoDB, as well as a frontend built with React that provides a user interface for interacting with the authentication system.



## Features

- User registration: Users can register for a new account by providing their name, email address, and password.

- User login: Registered users can login with their email address and password to access protected resources.

- Access control: The backend API includes middleware that restricts access to certain routes and resources to authenticated users only.

- Token-based authentication: User authentication is implemented using JSON Web Tokens (JWTs), which are securely transmitted between the frontend and backend via HTTP headers.
- User data storage: User account information is stored in a MongoDB database using Mongoose.

## Installation

Install my-project with npm

- Clone the repository to your local machine using git clone https://github.com/varunsudrik/MERN-Authentication-System.git.
- Navigate to the project directory using cd MERN-Authentication-System.
- Install the required dependencies using npm install.
- Start the backend server by running npm run server.
- Start the frontend development server by running npm run client.
-  Note  : Before running the application, make sure to provide your own MongoDB connection URI in the .env file.




```bash
git clone https://github.com/varunsudrik/MERN-Authentication-System.git  

cd MERN-Authentication-System

npm install

npm start - in client folder
node server.js - in server folder
```
    
## Contributing

Contributions are always welcome!

If you'd like to contribute to this project, please follow these steps:


Please adhere to this project's `code of conduct`.

- Fork the repository.
- Create a new branch with a descriptive name (git checkout -b my-new-feature).
- Make your changes and commit them (git commit -am 'Add some feature').
- Push your changes to your fork (git push origin my-new-feature).
- Create a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


[MIT](https://choosealicense.com/licenses/mit/)

