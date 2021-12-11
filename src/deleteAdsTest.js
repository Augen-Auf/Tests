
describe('Delete ads', () => {

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
        await page.waitForNavigation({"waitUntil" : "networkidle0"});

        await expect(page.url()).toMatch('home')
    });


    it('select ads and delete', async () => {
        const cards = await page.$$('div[class~=MuiGrid-item]');
        const deletableCards = await cards.filter(async card => {
            const deleteButton = await card.$x("//button[contains(., 'Удалить')]");
            return deleteButton.length > 0
        });
        const deleteButton = await deletableCards[0].$x("//button[contains(., 'Удалить')]");
        await deleteButton[0].click();
        await page.waitForTimeout(300);
        await page.screenshot({path: 'deleteDialogWindow.png'});

        const dialog = await page.$('div[class~=MuiDialogActions-spacing]');
        const dialogDeleteButtons = await dialog.$$("button");
        await dialogDeleteButtons[1].click();
        await page.waitForTimeout(1500);
        await page.screenshot({path: 'deleteAds.png'})
    })
});
