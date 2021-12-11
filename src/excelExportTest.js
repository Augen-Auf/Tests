
describe('Excel export', () => {

    beforeAll(async () => {
        await page.goto('https://denissfloww.github.io/car-ads/');
        await page.setViewport({
            width: 1920,
            height: 1080
        })
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

        await expect(page.url()).toMatch('home')
    });

    it('open compare section', async ()  => {
        const compareSectionButton = await page.$x("//button[contains(., 'Сравнения')]");

        if (compareSectionButton.length > 0) {
            await compareSectionButton[0].click();
        } else
            throw new Error("Compare button not found");

        await page.waitForSelector('#tableTitle');
        const headers = await page.$x("//span[contains(., 'Характеристики сравниваемых автомобилей')]");
        if (headers.length > 0)
            throw new Error("Section not open");

        const exportExcelButton = await page.$x("//button[contains(., 'Экспорт в Excel')]");

        if (exportExcelButton.length > 0) {
            await exportExcelButton[0].click();
            await page.screenshot({path: 'export.png'});
            await page.waitForTimeout(500);
        } else
            throw new Error("Compare button not found");
    })
});
