package com.laioffer.comSystem.service;

import com.laioffer.comSystem.dao.BookingDao;
import com.laioffer.comSystem.dao.ResidentDao;
import com.laioffer.comSystem.entity.Booking;
import com.laioffer.comSystem.entity.Resident;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private ResidentDao residentDao;

    public void addBooking(Booking booking) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String email = loggedInUser.getName();
        Resident resident = residentDao.getResident(email);
        booking.setResident(resident);
        booking.setStatus("pending");
        bookingDao.saveBooking(booking);
    }

    public void approveBooking(int bookingId) {
        bookingDao.updateBookingStatus(bookingId, "approved");
    }

    public void rejectBooking(int bookingId) {
        bookingDao.updateBookingStatus(bookingId, "rejected");
    }

    public List<Booking> getAllBookings() {
        return bookingDao.getAllBookings();
    }

    public List<Booking> getAllBookingsOfCurrentResident() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String email = loggedInUser.getName();
        Resident resident = residentDao.getResident(email);

        if (resident != null) {
            return resident.getBookingList();
        }
        return new ArrayList<>();
    }
}
