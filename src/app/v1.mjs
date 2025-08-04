import appointmentRouter from "../v1/routes/appointment.routes.mjs";
import authRouter from "../v1/routes/auth.routes.mjs";
import bookingRouter from "../v1/routes/booking.routes.mjs";
import doctorRouter from "../v1/routes/doctor.routes.mjs";
import feedbackRouter from "../v1/routes/feedback.routes.mjs";
import paymentRouter from "../v1/routes/payment.routes.mjs";
import seedRouter from "../v1/routes/seeds.routes.mjs";
import userRouter from "../v1/routes/users.routes.mjs";

// version 1 routes
const v1 = [
  {
    path: "/api/v1/auth",
    route: authRouter,
  },
  {
    path: "/api/v1/users",
    route: userRouter,
  },
  {
    path: "/api/v1/appointments",
    route: appointmentRouter,
  },
  {
    path: "/api/v1/bookings",
    route: bookingRouter,
  },
  {
    path: "/api/v1/doctors",
    route: doctorRouter,
  },
  {
    path: "/api/v1/payment",
    route: paymentRouter,
  },
  {
    path: "/api/v1/feedbacks",
    route: feedbackRouter,
  },
  {
    path: "/api/v1/seeds",
    route: seedRouter,
  },
];

export default v1;
