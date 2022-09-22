package com.laioffer.comSystem.dao;

import com.laioffer.comSystem.entity.Payment;
import com.laioffer.comSystem.entity.Post;
import com.laioffer.comSystem.entity.Resident;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PaymentDao {

    @Autowired
    private  SessionFactory sessionFactory;

    public void pay(List<Payment> paymentList, Payment payment){
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            paymentList.add(payment);
            session.getTransaction().commit();

        } catch (Exception ex) {
            ex.printStackTrace();
            if (session != null) session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    public List<Payment> allPayment(Resident resident){
        try (Session session = sessionFactory.openSession()){
            return resident.getPaymentList();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }


}
