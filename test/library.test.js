let webdriver = require('selenium-webdriver'),
    { describe, it, after, before} = require('selenium-webdriver/testing');
    By = webdriver.By,
    until = webdriver.until;
    let driver;

    
    describe('library app scenario', function(){
        this.timeout(50000);
        
        beforeEach(function(){
            driver = new webdriver.Builder().forBrowser('chrome').build();
            driver.get("https://library-app.firebaseapp.com/");
            driver.manage().window().maximize();
        });

        afterEach(function(){
            driver.sleep(2000);
            driver.quit();
        });


        
        it('Changes Button opacitiy upon email being filled out', function(){
            let submitBtn = driver.findElement(By.css('.btn-lg'));
            driver.findElement(By.css('input')).sendKeys('user@email.com');
            driver.wait(function(){
                return submitBtn.getCssValue('opacity').then(function(result){
                   return result === '1'; 
                });
            }, 15000);
        });

        it('submiting email shous an alert', function(){
            let submitBtn = driver.findElement(By.css('.btn-lg'));
            driver.findElement(By.css('input')).sendKeys('us@email.com');
            submitBtn.click();
            driver.wait(until.elementLocated(By.css('.alert-success')), 5000).getText().then(function(text){
                console.log("Alert success text is: " + text);
            });
        });

        it('shows a nav bar', function(){
            driver.findElement(By.css('nav')).getText().then(function(txt){
                console.log(txt);
            });
        });

    });


   
 