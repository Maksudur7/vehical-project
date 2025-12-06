import { Router } from "express";
import { bookingController } from "./booking.controller";
import jwtAuth from "../../../../middleware/jwtAuth";

const router = Router()

router.post("/bookings", jwtAuth,  bookingController.postBooking)
router.get("/bookings", jwtAuth, bookingController.getBooking)
router.put('/bookings/:bookingId', jwtAuth, bookingController.updateBooking)

export const bookingRouter = router;