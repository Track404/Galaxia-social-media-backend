# **Galaxia Backend** 🌌  
*Backend for the Galaxia social media platform.*  

## **Table of Contents**  
- [Features](#features)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Running the Server](#running-the-server)  
- [API Endpoints](#api-endpoints)  
- [Technologies](#technologies)  
- [Contributing](#contributing)  
- [License](#license)
  
## **Frontend**  
🔗 **Frontend Repository:** [Galaxia Frontend](https://github.com/Track404/Galaxia-social-media)  
*Link to the frontend of the Galaxia platform for the full user experience.*

## **Features**  
✅ User authentication using **JWT**  
✅ Secure endpoints for **creating, editing, and fetching posts**  
✅ User management (sign up, login, and profile updates)  
✅ User **follow/unfollow** functionality  
✅ Integration with **PostgreSQL** for persistent data storage  
✅ REST API architecture for communication between frontend and backend  

## **Installation**  
Clone the repository and install the necessary dependencies:  

```sh
git clone https://github.com/yourusername/galaxia-backend.git  
cd galaxia-backend  
npm install  
```

### **Configuration**  
Create a `.env` file in the root directory with the following environment variables:

```env
DATABASE_URL=your_postgresql_database_url  
JWT_SECRET=your_jwt_secret  
GITHUB_CLIENT_ID=your_github_client_id  
GITHUB_CLIENT_SECRET=your_github_client_secret  
```

### **Running the Server**  
1. Run database migrations:  

```sh
npm run migrate
```

2. Start the backend server:  

```sh
npm run server
```

The server will start running at `http://localhost:5000`.

## **API Endpoints**  

### **Authentication**  
- `POST /api/auth/signup` - Register a new user.  
- `POST /api/auth/login` - Log in and receive a JWT token.  
- `POST /api/auth/logout` - Log out the user by invalidating the JWT token.  

### **User**  
- `GET /api/users/me` - Get the authenticated user's profile.  
- `PUT /api/users/me` - Update the authenticated user's profile (e.g., name, avatar).  

### **Posts**  
- `POST /api/posts` - Create a new post.  
- `GET /api/posts` - Get all posts.  
- `GET /api/posts/:id` - Get a specific post by ID.  

### **Follow**  
- `POST /api/follow/:userId` - Follow a user.  
- `DELETE /api/follow/:userId` - Unfollow a user.  

### **Note:**  
There are **more API endpoints** available, but these listed above are the **basic** ones that provide the core functionality of the platform.  

## **Technologies**  
🛠 **Backend:** Node.js, Express.js  
🛢 **Database:** PostgreSQL  
🔐 **Authentication:** JWT  
📡 **API Type:** REST API  
🌍 **Deployment:** Can be deployed to services like Heroku, AWS, or any Node.js-supported cloud platform.  

## **Contributing**  
Contributions are welcome! Feel free to open an issue or submit a pull request.  

## **License**  
📜 MIT License - See the [LICENSE](LICENSE) file for details.  
