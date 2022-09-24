package com.laioffer.comSystem.controller;

import com.laioffer.comSystem.entity.Announcement;
import com.laioffer.comSystem.entity.Payment;
import com.laioffer.comSystem.entity.Resident;
import com.laioffer.comSystem.service.PaymentService;
import com.laioffer.comSystem.service.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ResidentService residentService;

    @RequestMapping(value = "/payment", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    @ResponseBody
    public void addPayment(@RequestBody Payment payment) {
        paymentService.addPayment(payment);
    }

    @RequestMapping(value = "/payment", method = RequestMethod.GET)
    @ResponseBody
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayment();
    }

    @RequestMapping(value = "/balance", method = RequestMethod.GET)
    @ResponseBody
    public int getBalance() {
        return paymentService.getBalance();
    }

    @RequestMapping(value = "/add_all_balance/{amount}", method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.OK)
    public void addBalanceToAllUsers(@PathVariable("amount") int amount) {
        residentService.addBalanceToAllUsers(amount);
    }

    @RequestMapping(value = "/residents", method = RequestMethod.GET)
    @ResponseBody
    public List<Resident> getAllResidents() {
        return residentService.getAllResident();
    }
}
