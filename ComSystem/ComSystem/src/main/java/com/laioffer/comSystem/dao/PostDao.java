package com.laioffer.comSystem.dao;

import com.laioffer.comSystem.entity.Post;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PostDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void createPost(Post post){
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(post);
            session.getTransaction().commit();
        }catch (Exception ex) {
            ex.printStackTrace();
            if (session != null) session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    public Post getPostItem(int postItemId){
        try (Session session = sessionFactory.openSession()){
            return session.get(Post.class, postItemId);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }

    /*public Post getAllPost(int id) {
        try (Session session = sessionFactory.openSession()){
            return session.get(Post.class,);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }*/
}
