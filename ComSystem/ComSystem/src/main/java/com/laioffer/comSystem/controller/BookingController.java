package com.laioffer.comSystem.controller;

import com.laioffer.comSystem.entity.Announcement;
import com.laioffer.comSystem.entity.Booking;
import com.laioffer.comSystem.entity.Resident;
import com.laioffer.comSystem.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @RequestMapping(value = "/booking", method = RequestMethod.POST)
    //@ResponseStatus(value = HttpStatus.CREATED)
    public void addBooking(@RequestBody Booking booking, HttpServletResponse response) {
        bookingService.addBooking(booking);
        response.setStatus(HttpStatus.CREATED.value());
    }

    @RequestMapping(value = "/all-bookings", method = RequestMethod.GET)
    @ResponseBody
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @RequestMapping(value = "/booking", method = RequestMethod.GET)
    @ResponseBody
    public List<Booking> getAllBookingOfCurrentResident() {
        return bookingService.getAllBookingsOfCurrentResident();
    }

    @RequestMapping(value = "/approve/{bookingId}", method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.OK)
    public void approveBooking(@PathVariable("bookingId") int bookingId) {
        bookingService.approveBooking(bookingId);
    }

    @RequestMapping(value = "/reject/{bookingId}", method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.OK)
    public void rejectBooking(@PathVariable("bookingId") int bookingId) {
        bookingService.rejectBooking(bookingId);
    }
}
