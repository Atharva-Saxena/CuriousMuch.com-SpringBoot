package com.curiousmuch.dto;

import jakarta.validation.constraints.*;

public class AnswerRequest {
    @NotBlank
    private String content;
    
    public AnswerRequest() {}
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}