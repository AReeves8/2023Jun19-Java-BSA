package com.skillstorm.spingmvc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.spingmvc.models.User;
import com.skillstorm.spingmvc.services.UserService;



/*
 * Controller vs RestController
 * 
 *      RestController implicitly adds @ResponseBody to every method in the class
 *          @ResponseBody will tell the controller that the object returned is serialized into JSON inside the body of the HTTP response
 */
@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    UserService service;


    // the actual path for the http request wll be /users/helloworld
    @RequestMapping("/helloworld")
    public String helloWorld() {
        return "Hello World!";
    }

    /*
     * GetMapping is an HTTP GET request
     *      same as @RequestMapping(method = RequestMethod.GET)
     */
    @GetMapping         // no path specified - means it'll just be /users
    public List<User> findAllUsers() {
        return service.findAllUsers();
    }

}
