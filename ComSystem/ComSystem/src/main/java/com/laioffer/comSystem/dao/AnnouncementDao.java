package com.laioffer.comSystem.dao;

import com.laioffer.comSystem.entity.Admin;
import com.laioffer.comSystem.entity.Announcement;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AnnouncementDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void save(Announcement announcement) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(announcement);
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

    public void remove(int announcementId) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            Announcement announcementToRemove = session.get(Announcement.class, announcementId);
            Admin admin = announcementToRemove.getAdmin();
            admin.getAnnouncementList().remove(announcementToRemove);

            session.beginTransaction();
            session.delete(announcementToRemove);
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

    public void removeAll(Admin admin) {
        for (Announcement announcement : admin.getAnnouncementList()) {
            remove(announcement.getID());
        }
    }

    public Announcement search(int announcementID) {
        Announcement announcement = null;
        try (Session session = sessionFactory.openSession()) {
            announcement = session.get(Announcement.class, announcementID);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return announcement;
    }

    public List<Announcement> getAllofAdmin(Admin admin) {
        return admin.getAnnouncementList();
    }

    public List<Announcement> getAllAnnouncements() {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Announcement> criteriaQuery = builder.createQuery(Announcement.class);
            criteriaQuery.from(Announcement.class);
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
