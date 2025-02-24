## DOCTOR's PORTAL SERVER

### DESCRIPTION

This is a server for a doctor's portal. It is a RESTful API that allows doctors to register, login, and manage their patients. It also allows patients to register, login, and book appointments with doctors. The server is built with Node.js, Express, and MongoDB.

### Features

- User registration
- User login
- User authentication
- User authorization
- User password reset
- User profile update
- User password update

### API ENDPOINTS

#### Auth Endpoints

| Method | Endpoint                   | Description           | Access  |
| ------ | -------------------------- | --------------------- | ------- |
| POST   | /api/v1/auth/register      | Register a new user   | Public  |
| POST   | /api/v1/auth/login         | Login a user          | Public  |
| POST   | /api/v1/auth/google-login  | Login with Google     | Public  |
| POST   | /api/v1/auth/activate      | Activate user account | Public  |
| GET    | /api/v1/auth/refresh-token | Refresh user token    | Public  |
| POST   | /api/v1/auth/logout        | Logout a user         | Private |
| GET    | /api/v1/auth/me            | Get user profile      | Private |

#### User Endpoints

| Method | Endpoint                             | Description          | Access               |
| ------ | ------------------------------------ | -------------------- | -------------------- |
| GET    | /api/v1/users                        | Get all users        | Admin                |
| POST   | /api/v1/users                        | Create a new user    | Admin                |
| PATCH  | /api/v1/users/ban-user/:id           | Ban a user           | Admin                |
| PATCH  | /api/v1/users/unban-user/:id         | Unban a user         | Admin                |
| PATCH  | /api/v1/users/update-password/:id    | Update user password | Admin                |
| GET    | /api/v1/users/forgot-password/:email | Forgot user password | Public               |
| PATCH  | /api/v1/users/make-admin/:id         | Make a user an admin | Admin                |
| PATCH  | /api/v1/users/role-change/:id        | Change user role     | Admin                |
| PATCH  | /api/v1/users/reset-password         | Reset user password  | Public               |
| GET    | /api/v1/users/:id                    | Get user by id       | Admin, Authenticated |
| DELETE | /api/v1/users/:id                    | Delete user by id    | Admin, Authenticated |
| PATCH  | /api/v1/users/:id                    | Update user by id    | Admin, Authenticated |

### Booking Endpoints

| Method | Endpoint             | Description          | Access               |
| ------ | -------------------- | -------------------- | -------------------- |
| GET    | /api/v1/bookings     | Get all bookings     | Admin                |
| POST   | /api/v1/bookings     | Create a new booking | Admin                |
| GET    | /api/v1/bookings/:id | Get booking by id    | Admin, Authenticated |
| PATCH  | /api/v1/bookings/:id | Update booking by id | Admin, Authenticated |
| DELETE | /api/v1/bookings/:id | Delete booking by id | Admin, Authenticated |

### Appointment Endpoints

| Method | Endpoint                 | Description              | Access               |
| ------ | ------------------------ | ------------------------ | -------------------- |
| GET    | /api/v1/appointments     | Get all appointments     | Admin                |
| POST   | /api/v1/appointments     | Create a new appointment | Admin                |
| GET    | /api/v1/appointments/:id | Get appointment by id    | Admin, Authenticated |
| PUT    | /api/v1/appointments/:id | Update appointment by id | Admin, Authenticated |
| DELETE | /api/v1/appointments/:id | Delete appointment by id | Admin, Authenticated |

### Doctor Endpoints

| Method | Endpoint            | Description         | Access |
| ------ | ------------------- | ------------------- | ------ |
| GET    | /api/v1/doctors     | Get all doctors     | Public |
| POST   | /api/v1/doctors     | Create a new doctor | Admin  |
| GET    | /api/v1/doctors/:id | Get doctor by id    | Public |
| PUT    | /api/v1/doctors/:id | Update doctor by id | Admin  |
| DELETE | /api/v1/doctors/:id | Delete doctor by id | Admin  |

### Feedback Endpoints

| Method | Endpoint              | Description           | Access               |
| ------ | --------------------- | --------------------- | -------------------- |
| GET    | /api/v1/feedbacks     | Get all feedbacks     | Admin                |
| POST   | /api/v1/feedbacks     | Create a new feedback | Authenticated        |
| GET    | /api/v1/feedbacks/:id | Get feedback by id    | Admin, Authenticated |
| DELETE | /api/v1/feedbacks/:id | Delete feedback by id | Admin, Authenticated |

### Payment Endpoints

| Method | Endpoint                              | Description                 | Access               |
| ------ | ------------------------------------- | --------------------------- | -------------------- |
| POST   | /api/v1/payment/pay                   | Create a new payment        | Admin, Authenticated |
| POST   | /api/v1/payment/create-payment-intent | Create a new payment intent | Admin, Authenticated |

### PACKAGES

- Express
- Express-validator
- Mongoose
- Multer
- Nodemailer
- Wintson Loger
- JWT
- Bcryptjs
- Cookie-parser

### LINKS

<a href="https://doctors-portal-f127f.web.app">Live Preview</a> <br/>
<a href="https://github.com/md-rejoyan-islam/doctor-portal">Frontend Repository</a> <br/>
<a href="https://tinyurl.com/33yacxun">Preview API</a> <br/>

### CONTACT

If you have any questions or suggestions, feel free to reach out:

- Email :rejoyanislam0014@gmail.com
- GitHub : [Rejoyan Islam GitHub](https://github.com/md-rejoyan-islam)
- LinkedIn : [Rejoyan Islam LinkedIn](https://www.linkedin.com/in/md-rejoyan-islam/)
- Personal Website : [Rejoyan Islam Portfolio](https://md-rejoyan-islam.github.io/)
