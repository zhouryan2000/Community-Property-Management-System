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
