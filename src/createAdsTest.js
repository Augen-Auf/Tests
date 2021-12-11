describe('Create ads', () => {

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
        await page.waitForTimeout(200);
        await expect(page.url()).toMatch('login')
    });

    it('input credentials and login', async ()  => {

        await page.type('input[name=username]', 'test');
        await page.type('input[name=password]', 'password');

        await page.click('button[type=submit]');
        await page.waitForNavigation();

        await expect(page.url()).toMatch('home')
    });

    it('open create ads page', async ()  => {
        const linkHandlers = await page.$x("//a[contains(@href, '/append')]");

        if (linkHandlers.length > 0) {
            await linkHandlers[0].click();
        } else {
            throw new Error("Link not found");
        }
        await page.waitForTimeout(200);
        await expect(page.url()).toMatch('append')
    });

    it('input auto data and create ads', async () => {

        const fieldsInputArray = [
            {
                tag: 'input',
                id: 'brandSelect',
                input: 'Toy'
            },
            {
                tag: 'input',
                id: 'modelSelect',
                input: 'Corolla'
            },
            {
                tag: 'input',
                id: 'yearSelect',
                input: '2019'
            },
            {
                tag: 'input',
                id: 'bodyTypeSelect',
                input: 'Седан',
                timeout: true
            },
            {
                tag: 'li',
                class: 'generation-image-div'
            },
            {
                tag: 'input',
                id: 'engineType',
                input: 'Гибрид'
            },
            {
                tag: 'input',
                id: 'driveTypeSelect',
                input: 'Передний'
            },
            {
                tag: 'input',
                id: 'gearBoxSelect',
                input: 'Автоматическая',
                timeout: true
            },
            {
                tag: 'radio',
                name: 'modification',
            },
            // {
            //     tag: 'file',
            //     filename: 'export.png'
            // },
            // // {
            //     tag: 'input',
            //     id: 'phoneNumberInput',
            //     input: '1627627624',
            //     isTextField: true
            // },
            {
                tag: 'radio',
                name: 'countOwners'
            }

        ];
        for (const fieldInput of fieldsInputArray)
        {
            switch (fieldInput.tag) {
                case "input":
                    await page.focus(`input[id="${fieldInput.id}"]`);
                    await page.type(`input[id="${fieldInput.id}"]`, fieldInput.input)
                    if(!fieldInput.isTextField) {
                        await page.waitForSelector('li[class~=MuiAutocomplete-option]');
                        await page.click('li[class~=MuiAutocomplete-option]');
                    }
                    if(fieldInput.timeout)
                        await page.waitForTimeout(200);
                    break;
                case "radio":
                    await page.click(`input[name='${fieldInput.name}']`);
                    break;
                case "file":
                    const elementHandle = await page.$("input[type=file]");
                    await elementHandle.uploadFile(fieldInput.filename);
                    break;
                case "li":
                    const elementsHandler = await page.$(`li[class~=${fieldInput.class}]`)
                    await elementsHandler.click();
            }
            await page.screenshot({path: 'img.png'});
        }
        await page.click('button[type=submit]')
        await page.waitForTimeout(500);
        await page.screenshot({path: 'createAds.png'})
        await expect(page.url()).toMatch('success')
    })
});
