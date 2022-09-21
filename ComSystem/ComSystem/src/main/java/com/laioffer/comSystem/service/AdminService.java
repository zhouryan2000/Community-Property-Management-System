package com.laioffer.comSystem.service;

import com.laioffer.comSystem.dao.AdminDao;
import com.laioffer.comSystem.entity.Admin;
import com.laioffer.comSystem.entity.Announcement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminDao adminDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean signUp(Admin admin) {
        if (adminDao.getAdmin(admin.getEmail()) != null) return false;

        List<Announcement> announcementList = new ArrayList<>();
        admin.setAnnouncementList(announcementList);

        admin.setEnabled(true);
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        adminDao.signUp(admin);
        return true;
    }

    public Admin getAdmin(String email) {
       return adminDao.getAdmin(email);
    }
}
