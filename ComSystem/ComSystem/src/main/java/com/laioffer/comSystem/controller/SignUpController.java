package com.laioffer.comSystem.controller;

import com.laioffer.comSystem.entity.Resident;
import com.laioffer.comSystem.service.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;

@Controller
public class SignUpController {
    @Autowired
    private ResidentService residentService;
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    //@ResponseStatus(value = HttpStatus.CREATED)
    public void signUp(@RequestBody Resident resident, HttpServletResponse response) {
        if (residentService.signUp(resident)) {
            response.setStatus(HttpStatus.CREATED.value());
        }
        else {
            response.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
        }
    }
}
