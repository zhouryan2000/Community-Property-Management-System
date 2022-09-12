package com.laioffer.comSystem.dao;

import com.laioffer.comSystem.entity.Authority;
import com.laioffer.comSystem.entity.Resident;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ResidentDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void signUp(Resident resident) {
        Authority authority = new Authority();
        authority.setEmail(resident.getEmail());
        authority.setAuthority("ROLE_USER");

        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(authority);
            session.save(resident);
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

    public Resident getResident(String email) {
        Resident resident = null;
        Session session = null;

        try {
            session = sessionFactory.openSession();
            resident = session.get(Resident.class, email);
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (session != null) session.close();
        }
        return resident;
    }
}
