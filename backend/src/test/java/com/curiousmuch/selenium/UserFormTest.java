package com.curiousmuch.selenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserFormTest {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    @Test
    void testAddUser() {
        driver.get("http://localhost:3000/users");
        
        // Fill form
        WebElement idInput = driver.findElement(By.xpath("//input[@placeholder='ID']"));
        WebElement nameInput = driver.findElement(By.xpath("//input[@placeholder='Name']"));
        WebElement addButton = driver.findElement(By.xpath("//button[text()='Add']"));
        
        idInput.sendKeys("123");
        nameInput.sendKeys("Test User");
        addButton.click();
        
        // Verify user was added (assuming it appears in the list)
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//span[contains(text(), '123: Test User')]")));
        
        WebElement userItem = driver.findElement(By.xpath("//span[contains(text(), '123: Test User')]"));
        assertTrue(userItem.isDisplayed());
    }
    
    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}