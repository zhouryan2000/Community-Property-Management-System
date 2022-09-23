package com.laioffer.comSystem.controller;

import com.laioffer.comSystem.entity.Post;
import com.laioffer.comSystem.entity.Resident;
import com.laioffer.comSystem.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Controller
public class PostController {
    @Autowired
    private PostService postService;

    @RequestMapping(value =  "/post", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addPost(@PathVariable("post") Post post) {
        postService.createPost(post);
    }

}
