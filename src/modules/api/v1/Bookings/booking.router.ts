import { Router } from "express";
import { bookingController } from "./booking.controller";
import customerOrAdmin from "../../../../middleware/customerOrAdmin";
import rolebaseGet from "../../../../middleware/rolebaseGet";
import bookingAccess from "../../../../middleware/bookingAccess";
import jwtAuth from "../../../../middleware/jwtAuth";

const router = Router()

router.post("/bookings", jwtAuth, customerOrAdmin,  bookingController.postBooking)
router.get("/bookings", jwtAuth, rolebaseGet,  bookingController.getBooking)
router.put('/bookings/:bookingId', jwtAuth, bookingAccess, bookingController.updateBooking)

export const bookingRouter = router;