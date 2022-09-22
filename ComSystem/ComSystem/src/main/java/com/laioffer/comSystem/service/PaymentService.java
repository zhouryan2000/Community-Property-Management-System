package com.laioffer.comSystem.service;


import com.laioffer.comSystem.dao.PaymentDao;
import com.laioffer.comSystem.entity.Payment;
import com.laioffer.comSystem.entity.Resident;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private ResidentService residentService;

    @Autowired
    private PaymentDao paymentDao;

    public void pay(Payment payment){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Resident resident = residentService.getResident(username);

        if(resident != null){
            List<Payment> paymentList = resident.getPaymentList();
            paymentDao.pay(resident.getPaymentList(), payment);
            payment.setAmount(0);
            return;
        }
        return;
    }
    public List<Payment> allPayment(){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Resident resident = residentService.getResident(username);

        if(resident != null){
            return paymentDao.allPayment(resident);

        }
        return new ArrayList<>();

    }



}
