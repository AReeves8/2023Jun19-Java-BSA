package com.skillstorm.spingmvc.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skillstorm.spingmvc.models.User;

@Service    // stereotype annotation for @Component
public class UserService {
    
    /*
     * all business logic for controllers and repositories
     * 
     * 
     * 
     * for this example, I'm simulating getting data back
     *      IN PRACTICE - you'd want to call you repository
     *  
     */


    public List<User> findAllUsers() {
        List<User> users = new LinkedList<>();

        users.add(new User(0, "Austin", "Reeves", "areeves@skillstorm.com", "veryStrongPasword123!"));
        users.add(new User(1, "Calin", "Blauth", "cblauth@skillstorm.com", "veryStrongPasword123!"));
        users.add(new User(2, "Jordan", "Espinosa", "jespinosa@skillstorm.com", "veryStrongPasword123!"));
        users.add(new User(3, "Chris", "Beherens", "cbehrens@skillstorm.com", "veryStrongPasword123!"));

        return users;
    }
}
