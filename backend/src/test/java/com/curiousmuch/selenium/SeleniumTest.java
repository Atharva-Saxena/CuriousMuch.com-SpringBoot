package com.curiousmuch.selenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class SeleniumTest {
    
    private WebDriver driver;
    
    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        driver = new ChromeDriver(options);
    }
    
    @Test
    void testFrontendHomePage() {
        driver.get("http://localhost:3000");
        
        WebElement title = driver.findElement(By.tagName("h1"));
        assertTrue(title.getText().contains("CuriousMuch.com"));
    }
    
    @Test
    void testUsersPage() {
        driver.get("http://localhost:3000/users");
        
        WebElement heading = driver.findElement(By.tagName("h2"));
        assertTrue(heading.getText().contains("Users"));
    }
    
    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}