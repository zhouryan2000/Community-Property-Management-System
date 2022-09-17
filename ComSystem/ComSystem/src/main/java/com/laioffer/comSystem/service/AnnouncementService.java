package com.laioffer.comSystem.service;

import com.laioffer.comSystem.dao.AnnouncementDao;
import com.laioffer.comSystem.entity.Admin;
import com.laioffer.comSystem.entity.Announcement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnnouncementService {
    @Autowired
    private AdminService adminService;

    @Autowired
    private AnnouncementDao announcementDao;

    public void saveAnnouncement(Announcement announcement) {
        Admin admin = getAdmin();
        if (admin != null) {
            announcementDao.save(announcement);
        }
    }

    public void deleteAnnouncement(int id) {
        Admin admin = getAdmin();
        if (admin != null) {
            announcementDao.remove(id);
        }
    }

    public void cleanAnnouncementList() {
        Admin admin = getAdmin();
        if (admin != null) {
            announcementDao.removeAll(admin);
        }
    }

    public List<Announcement> getAnnouncementList() {
        Admin admin = getAdmin();
        if (admin != null) {
            return announcementDao.getAll(admin);
        }
        return new ArrayList<Announcement>();
    }

    //helper function to get logged-in admin
    private Admin getAdmin() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Admin admin = adminService.getAdmin(username);
        return admin;
    }
}
