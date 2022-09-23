package com.laioffer.comSystem.controller;

import com.laioffer.comSystem.entity.Payment;
import com.laioffer.comSystem.entity.Post;
import com.laioffer.comSystem.entity.Resident;
import com.laioffer.comSystem.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
public class PostController {
    @Autowired
    private PostService postService;

    @RequestMapping(value = "/post", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    @ResponseBody
    public void createPost(@RequestBody Post post) {
        postService.createPost(post);
    }

    @RequestMapping(value = "/all-post", method = RequestMethod.GET)
    @ResponseBody
    public List<Post> getAllPosts() {
        return postService.getAllPost();
    }

    @RequestMapping(value = "/post/{postId}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deletePost(@PathVariable("postId") int postId) {
        postService.deletePost(postId);
    }

    @RequestMapping(value = "/post", method = RequestMethod.GET)
    @ResponseBody
    public List<Post> getPostsOfCurrentResident() {
        return postService.getPostsOfCurrentResident();
    }
}
