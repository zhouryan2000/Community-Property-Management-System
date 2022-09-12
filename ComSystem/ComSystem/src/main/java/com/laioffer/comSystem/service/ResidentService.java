package com.laioffer.comSystem.service;

import com.laioffer.comSystem.dao.ResidentDao;
import com.laioffer.comSystem.entity.Resident;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ResidentService {
    @Autowired
    private ResidentDao residentDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean signUp(Resident resident) {
        if (residentDao.getResident(resident.getEmail()) != null) return false;

        resident.setMoneyBalance(0);
        resident.setEnabled(true);
        resident.setPassword(passwordEncoder.encode(resident.getPassword()));

        residentDao.signUp(resident);
        return true;
    }
}
