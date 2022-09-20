package com.laioffer.comSystem.service;

import com.laioffer.comSystem.dao.AdminDao;
import com.laioffer.comSystem.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminDao adminDao;

    public Admin getAdmin(String email) {
       return adminDao.getAdmin(email);
    }
}
