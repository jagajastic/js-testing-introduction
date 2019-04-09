const { generateText } = require('./util');
const puppeteer = require('puppeteer');

test('Should output name and age', () => {
    const text =  generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

test('Should output balnk name and age', () => {
    const text = generateText(' ', 90);
    expect(text).toBe('  (90 years old)');
});

test('Should output blank name and age', () =>{
    const text = generateText(' ', ' ');
    expect(text).toBe('  (  years old)');
});

test('Should click a button and create element with correct class', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('file:///Users/hijoes/go/src/github.com/decagon/js-testing-introduction/index.html');

    await page.click('input#name');
    await page.type('input#name','Anna');
    
    await page.click('input#age');
    await page.type('input#age', '28');
    
    await page.click('#btnAddUser');

    const finaltext = await page.$eval('.user-list', el => el.textContent);
    expect(finaltext).toBe('Anna (28 years old)');
});