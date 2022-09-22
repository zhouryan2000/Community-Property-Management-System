package com.laioffer.comSystem.controller;

import com.laioffer.comSystem.entity.Payment;
import com.laioffer.comSystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

public class PaymentController {


    @Autowired
    private PaymentService paymentService;

    @RequestMapping(value = "/payment", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public void pay(@PathVariable("payment") Payment payment) {
        paymentService.pay(payment);
    }
    @RequestMapping(value = "/payment", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public void allPayment(){paymentService.allPayment();}
}
