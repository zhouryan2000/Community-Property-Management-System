package com.laioffer.comSystem.dao;

import com.laioffer.comSystem.entity.Admin;
import com.laioffer.comSystem.entity.Announcement;
import com.laioffer.comSystem.entity.Authority;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdminDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void signUp(Admin admin) {
        Authority authority = new Authority();
        authority.setAuthority("ROLE_USER");
        authority.setEmail(admin.getEmail());

        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(authority);
            session.save(admin);
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

    public Admin getAdmin(String email) {
        Admin admin = null;
        try (Session session = sessionFactory.openSession()) {
            admin = session.get(Admin.class, email);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return admin;
    }
}
