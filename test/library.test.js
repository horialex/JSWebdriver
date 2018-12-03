    var { describe, it, after, before} = require('selenium-webdriver/testing');
    var Page = require("../lib/home_page");
    let page;

    
    describe('library app scenario', function(){
        this.timeout(999999);
        
        beforeEach(function(){
            page = new Page();
            // page.driver.manage().window().maximize();
            // page.visit("http://library-app.firebaseapp.com");
            page.visit(page.url);
        });

        afterEach(function(){
            page.driver.sleep(2000);
            page.quit();
        });

        

        it('Typing valid email changes button opacity to 1', function(){
           let btn = page.requestBtn();
        });

        it('Typing valid email enables request button', function(){
           let btn = page.requestBtn();
        });

        it('Clicking Request invitation triggers a confirmation box', function(){
            let alert = page.alertSuccess();
        });

    });


   
 