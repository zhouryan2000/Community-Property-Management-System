package com.laioffer.comSystem.dao;

import com.laioffer.comSystem.entity.Announcement;
import com.laioffer.comSystem.entity.Payment;
import com.laioffer.comSystem.entity.Post;
import com.laioffer.comSystem.entity.Resident;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PaymentDao {

    @Autowired
    private  SessionFactory sessionFactory;

    public void addPayment(Payment payment){
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(payment);
            session.getTransaction().commit();

        } catch (Exception ex) {
            ex.printStackTrace();
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    public List<Payment> getAllPayments(){
        Session session = null;
        try {
            session = sessionFactory.openSession();
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Payment> criteriaQuery = builder.createQuery(Payment.class);
            criteriaQuery.from(Payment.class);
            return session.createQuery(criteriaQuery).getResultList();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return new ArrayList<>();
    }


}
