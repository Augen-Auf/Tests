
describe('Login', () => {

    beforeAll(async () => {
        await page.goto('https://denissfloww.github.io/car-ads/');
    });

    it('open  site', async () => {
        await expect(page.title()).resolves.toMatch('Car ads');
    });

    it('open auth page', async ()  => {
        const linkHandlers = await page.$x("//a[contains(@href, '/login')]");

        if (linkHandlers.length > 0) {
            await linkHandlers[0].click();
        } else {
            throw new Error("Link not found");
        }
        await page.waitForNavigation();
        await expect(page.url()).toMatch('login')
    });

    it('input credentials and login', async ()  => {

        await page.type('input[name=username]', 'test');
        await page.type('input[name=password]', 'password');

        await page.click('button[type=submit]');
        await page.waitForNavigation();

        await expect(page.url()).toMatch('home');
        await page.screenshot({path: 'login.png'});
    })
});
