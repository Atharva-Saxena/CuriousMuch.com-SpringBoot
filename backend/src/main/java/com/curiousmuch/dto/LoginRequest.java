package com.curiousmuch.dto;

import jakarta.validation.constraints.*;

public class LoginRequest {
    @NotBlank
    private String username;
    
    @NotBlank
    private String password;
    
    public LoginRequest() {}
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}