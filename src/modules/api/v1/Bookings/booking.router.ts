import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router()

router.post("/bookings", bookingController.postBooking)
router.get("/bookings", bookingController.getBooking)
router.put('/bookings/:bookingId', bookingController.updateBooking)

export const bookingRouter = router;