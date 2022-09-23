package com.laioffer.comSystem.service;

import com.laioffer.comSystem.dao.PostDao;
import com.laioffer.comSystem.entity.Payment;
import com.laioffer.comSystem.entity.Post;
import com.laioffer.comSystem.entity.Resident;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        post.setResident(resident);

        if(resident != null){
            postDao.createPost(post);
        }
    }

    public List<Post> getAllPost() {
        return postDao.getAllPosts();
    }

    public void deletePost(int postId) {
        postDao.deletePost(postId);
    }

    public List<Post> getPostsOfCurrentResident() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String email = loggedInUser.getName();

        ArrayList<Post> result = new ArrayList<>();

        for (Post post: postDao.getAllPosts()) {
            if (post.getResident().getEmail().equals(email)) {
                result.add(post);
            }
        }

        return result;
    }
}
