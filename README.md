# MINI_INSTA 

MINI_INSTA is a lightweight social media platform where users can create posts, comment on posts, and interact with each other.

## 🚀 Features

Key features include:
- User signup and login functionality
- Create, update, delete, find by ID, and list posts
- Comment creation, editing, and deletion (users can only edit/delete their own comments; admins can edit/delete any comment)
- Role-based access control (admin and user roles)

## 🛠️ Technologies Used

The project utilizes:
- Node.js
- Express.js
- MongoDB
- Passport.js (for authentication)
- Envalid (for environment variable validation)
- Other relevant libraries

## 📦 Installation

To run MINI_INSTA (ProjectX) locally:

1. Clone the repository:

git clone https://github.com/your/repository.git



2. Install dependencies:
npm install


3. Set environment variables:
- Create a `.env` file based on `.env.example` and configure necessary environment variables for development.

4. Start the application:
npm start




## 🚦 Usage

Use MINI_INSTA (ProjectX) as follows:
- Sign up for an account using a username and password.
- Log in with your credentials.
- Create, update, delete, view by ID, and list all posts you have created.
- Comment on posts; edit and delete your own comments.
- Admins can delete any post or comment.

## 🔒 Authentication

Authentication is implemented with Passport.js:
- Uses a local strategy for username and password authentication.
- Configuration is found in `passport-config.js`.

## 🚨 Error Handling

Error handling is robust:
- Middleware catches and formats errors.
- Common scenarios (e.g., validation errors, unauthorized access) are handled with appropriate HTTP status codes and messages.

## 📊 Database

MongoDB stores data:
- User schema includes fields like username, hashed password, role.
- Post schema includes fields like title, content, author (reference to User).
- Comment schema includes fields like content, post (reference to Post), author (reference to User).

## 🤝 Contributing

Contribute to MINI_INSTA (ProjectX):
- Fork and clone the repository.
- Create a new branch for your feature/fix.
- Test thoroughly.
- Push your branch and open a pull request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed with ❤️ by [ Tarun Meena ].
