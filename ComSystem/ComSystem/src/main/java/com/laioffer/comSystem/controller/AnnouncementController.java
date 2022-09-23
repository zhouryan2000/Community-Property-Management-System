package com.laioffer.comSystem.controller;

import com.laioffer.comSystem.entity.Announcement;
import com.laioffer.comSystem.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class AnnouncementController {
    @Autowired
    private AnnouncementService announcementService;

    @RequestMapping(value = "/announcement", method = RequestMethod.GET)
    @ResponseBody
    public List<Announcement> getAnnouncements(){
        return announcementService.getAllAnnouncement();
    }

    @RequestMapping(value = "/announcement", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    @ResponseBody
    public void uploadAnnouncement(@RequestBody Announcement announcement) {
        final Announcement announcementToUpload = new Announcement();
        announcementToUpload.setTitle(announcement.getTitle());
        announcementToUpload.setContent(announcement.getContent());
        announcementService.saveAnnouncement(announcementToUpload);
    }

    @RequestMapping(value = "/announcement/{announcementId}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteAnnouncement(@PathVariable("announcementId") int announcementId) {
        announcementService.deleteAnnouncement(announcementId);
    }

    @RequestMapping(value = "/announcement", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void cleanAnnouncement() {
        announcementService.cleanAnnouncementList();
    }
}
