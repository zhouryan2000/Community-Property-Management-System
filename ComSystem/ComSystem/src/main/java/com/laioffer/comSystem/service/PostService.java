package com.laioffer.comSystem.service;

import com.laioffer.comSystem.dao.PostDao;
import com.laioffer.comSystem.entity.Payment;
import com.laioffer.comSystem.entity.Post;
import com.laioffer.comSystem.entity.Resident;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.CustomAutowireConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostDao postDao;

    @Autowired
    private ResidentService residentService;


    public void createPost(Post post){


        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Resident resident = residentService.getResident(username);


        postDao.createPost(post);

    }

    public Post getPost(int id) {
        return postDao.getPostItem(id);
    }

    public Post getAllPost(int id) {
        return postDao.getAllPost(id);
    }


}
