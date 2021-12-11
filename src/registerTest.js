describe('Register', () => {
    beforeAll(async () => {
        await page.goto('https://denissfloww.github.io/car-ads/');
    });

    it('open  site', async () => {
        await expect(page.title()).resolves.toMatch('Car ads');
    });

    it('open register page', async ()  => {
        const linkHandlers = await page.$x("//a[contains(@href, '/signup')]");

        if (linkHandlers.length > 0) {
            await linkHandlers[0].click();
        } else {
            throw new Error("Link not found");
        }
        await page.waitForTimeout(200);
        await expect(page.url()).toMatch('signup')
    });

    it('input credentials and register', async ()  => {

        await page.type('input[name=username]', 'lemongrass');
        await page.type('input[name=password]', '123456');
        await page.type('input[name=confirmPassword]', '123456');

        await page.click('button[type=submit]');
        await page.waitForTimeout(1000);

        await expect(page.url()).toMatch('home');
        await page.screenshot({path: 'register.png'});
    })

});
