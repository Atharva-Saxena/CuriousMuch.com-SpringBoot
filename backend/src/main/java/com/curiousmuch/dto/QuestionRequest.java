package com.curiousmuch.dto;

import com.curiousmuch.model.Category;
import jakarta.validation.constraints.*;

public class QuestionRequest {
    @NotBlank
    @Size(min = 10, max = 200)
    private String title;
    
    @NotBlank
    private String content;
    
    private String imageUrl;
    
    @NotNull
    private Category category;
    
    public QuestionRequest() {}
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}