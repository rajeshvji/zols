/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zols.templatemanager.domain;

import org.springframework.data.annotation.Id;

/**
 *
 * @author rahul_ma
 */
public class TemplateRepository {

    public static final String FILE_SYSTEM = "file";
    public static final String FTP = "ftp";

    @Id
    private String name;
    private String description;
    private String type;
    private String path;
    private String host;
    private String userName;
    private String password;
    private String rootFolder;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }



    
    
    
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRootFolder() {
        return rootFolder;
    }

    public void setRootFolder(String rootFolder) {
        this.rootFolder = rootFolder;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
