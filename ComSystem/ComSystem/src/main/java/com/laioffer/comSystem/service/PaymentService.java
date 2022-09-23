package com.laioffer.comSystem.service;


import com.laioffer.comSystem.dao.PaymentDao;
import com.laioffer.comSystem.dao.ResidentDao;
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

    public void addPayment(Payment payment){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String email = loggedInUser.getName();
        Resident resident = residentService.getResident(email);

        if(resident != null){
            payment.setResident(resident);
            paymentDao.addPayment(payment);
            residentService.updateResidentBalance(email, -payment.getAmount());
        }
    }
    public List<Payment> getAllPayment(){
        return paymentDao.getAllPayments();
    }

    public int getBalance() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String email = loggedInUser.getName();
        return residentService.getResident(email).getMoneyBalance();
    }
}
