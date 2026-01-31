// tests/assignment1.spec.js
const { test, expect } = require('@playwright/test');

// --- CONFIGURATION ---
const TARGET_URL = 'https://www.swifttranslator.com/';

const INPUT_SELECTOR = 'role=textbox[name="Input Your Singlish Text Here."]';
// Use a class-contains XPath to be robust against class order changes
const OUTPUT_SELECTOR = 'xpath=//div[contains(@class, "whitespace-pre-wrap")]';

test.describe('TEST - SwiftTranslator Automation', () => {

  // Run before every test
  test.beforeEach(async ({ page }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector(INPUT_SELECTOR, { state: 'visible', timeout: 10000 });
  });

  // --- DATA DRIVEN TESTS (Standard Conversions) ---
  const testCases = [
    // POSITIVE SCENARIOS
    { id: 'Pos_Fun_01', input: 'mama heta class yanavaa', expected: 'මම හෙට class යනවා' },
    { id: 'Pos_Fun_02', input: 'mama paadam kalaa eth mata amathaka unaa', expected: 'මම පාඩම් කලා එත් මට අමතක උනා' },
    { id: 'Pos_Fun_03', input: 'vahinavaa nam mama ennee naee', expected: 'වහිනවා නම් මම එන්නේ නෑ' },
    { id: 'Pos_Fun_04', input: 'oyaa adha havasa free dha?', expected: 'ඔයා අද හවස free ද?' },
    { id: 'Pos_Fun_05', input: 'eeka mata ikmanata evanna', expected: 'ඒක මට ඉක්මනට එවන්න' },
    { id: 'Pos_Fun_06', input: 'api heta anivaaryen enavaa', expected: 'අපි හෙට අනිවාර්යෙන් එනවා' },
    { id: 'Pos_Fun_07', input: 'mata eka karanna baee', expected: 'මට එක කරන්න බෑ' },
    { id: 'Pos_Fun_08', input: 'karuNaakara mata udhav karanna', expected: 'කරුණාකර මට උදව් කරන්න' },
    { id: 'Pos_Fun_09', input: 'machan mata salli tikak dhiyan', expected: 'මචන් මට සල්ලි ටිකක් දියන්' },
    { id: 'Pos_Fun_10', input: 'suba udhaeesanak yaaluvanee', expected: 'සුබ උදෑසනක් යාලුවනේ' },
    { id: 'Pos_Fun_11', input: 'mata pen eka dhenavadha?', expected: 'මට pen එක දෙනවද?' },
    { id: 'Pos_Fun_12', input: 'hari mama eka karannam', expected: 'හරි මම එක කරන්නම්' },
    { id: 'Pos_Fun_13', input: 'adha udhenma bath kanna ooni', expected: 'අද උදෙන්ම බත් කන්න ඕනි' }, //mata nidimayhao
    { id: 'Pos_Fun_14', input: 'poddak inna mama enakan', expected: 'පොඩ්ඩක් ඉන්න මම එනකන්' },
    { id: 'Pos_Fun_15', input: 'himin himin yamu', expected: 'හිමින් හිමින් යමු' },
    { id: 'Pos_Fun_16', input: 'apilQQkaavatayanavaa', expected: 'අපිලංකාවටයනවා' }, // Robustness (Joined)
    { id: 'Pos_Fun_17', input: 'api iiyee film ekak baeluvaa', expected: 'අපි ඊයේ film එකක් බැලුවා' },
    { id: 'Pos_Fun_18', input: 'mama dhaen tea bonavaa', expected: 'මම දැන් tea බොනවා' },
    { id: 'Pos_Fun_19', input: 'api labana sathiyee yamu', expected: 'අපි ලබන සතියේ යමු' },
    { id: 'Pos_Fun_20', input: 'Lamayi okkoma sellam karanavaa', expected: 'ළමයි ඔක්කොම සෙල්ලම් කරනවා' },
    { id: 'Pos_Fun_21', input: 'mata WiFi password eka dhenna', expected: 'මට WiFi password එක දෙන්න' },
    { id: 'Pos_Fun_22', input: 'magee ID eka naethi unaa', expected: 'මගේ ID එක නැති උනා' },
    { id: 'Pos_Fun_23', input: 'paan piti 500g k ganna', expected: 'පාන් පිටි 500g ක් ගන්න' },

    // NEGATIVE SCENARIOS (Robustness Checks)
    { id: 'Neg_Fun_01', input: 'mamanuvarayanavaa', expected: 'මම නුවර යනවා' }, 
    { id: 'Neg_Fun_02', input: 'adhaofficeZoommeetingekata mama leetvenavaa', expected: 'අද ඔෆ්ෆිcඑ Zඕම්මේටින්ගෙකට මම ලේට්වෙනවා' },
    { id: 'Neg_Fun_03', input: 'hetaovunyanavaanam api noya imu', expected: 'හෙට ඔවුන් යනවා නම් අපි නොය ඉමු' },
    { id: 'Neg_Fun_04', input: 'mata         udheeta        kanna      bath           oonee', expected: 'මට උදේට කන්න බත් ඕනේ' },
    { id: 'Neg_Fun_05', input: 'mama gedhara yanavaa \n kamal oyaa enavadha?', expected: 'මම ගෙදර යනවා කමල් ඔයා එනවද?' },
    { id: 'Neg_Fun_06', input: 'hari hari hari hari hari eeka hariyatavaeda karanavaa', expected: 'හරි  ඒක හරියට වැඩ කරනවා' },
    { id: 'Neg_Fun_07', input: 'mama gedhara yanavaa,,, oyaa enavadha???', expected: 'මම ගෙදර යනවා, ඔයා එනවද?' },
    { id: 'Neg_Fun_08', input: 'mama adha edhan work-out karanna patan gannavaa', expected: 'මම අද එදන් work  out කරන්න පටන් ගන්නවා' },
    { id: 'Neg_Fun_09', input: 'mama ADha Hetama geDhara yaNavaa', expected: 'මම අද හෙටම ගෙදර යනවා' },
    { id: 'Neg_Fun_10', input: 'Aparaadha parikshana thumiya pita viya', expected: 'අපරාධ පරික්ශණ තුමිය පිට විය' },
  ];

  // Loop through and create tests dynamically
  for (const tc of testCases) {
    test(`${tc.id}: ${tc.input}`, async ({ page }) => {
      await page.waitForSelector(INPUT_SELECTOR, { state: 'visible', timeout: 10000 });
      await page.fill(INPUT_SELECTOR, tc.input, { timeout: 10000 });

      // For positive cases, require non-empty output and exact match.
      // For negative/robustness cases, allow empty output but if `failCheck` is provided
      // ensure the reported output (if any) contains that token.
      let actualOutput = '';
      if (tc.id.startsWith('Pos')) {
        // Wait until any matching output container has non-empty text
        await page.waitForFunction(() => {
          const els = Array.from(document.querySelectorAll('div.whitespace-pre-wrap'));
          return els.some(e => e.textContent && e.textContent.trim().length > 0);
        }, null, { timeout: 10000 });
        actualOutput = await page.evaluate(() => {
          const els = Array.from(document.querySelectorAll('div.whitespace-pre-wrap'));
          const e = els.find(el => el.textContent && el.textContent.trim().length > 0);
          return e ? e.textContent.trim() : '';
        });
        expect(actualOutput).toBe(tc.expected);
      } else {
        // Try briefly to detect any non-empty output, but don't fail if none appears
        try {
          await page.waitForFunction(() => {
            const els = Array.from(document.querySelectorAll('div.whitespace-pre-wrap'));
            return els.some(e => e.textContent && e.textContent.trim().length > 0);
          }, null, { timeout: 3000 });
        } catch (e) {
          // swallow timeout — negative cases may yield empty output
        }
        actualOutput = await page.evaluate(() => {
          const els = Array.from(document.querySelectorAll('div.whitespace-pre-wrap'));
          const e = els.find(el => el.textContent && el.textContent.trim().length > 0);
          return e ? e.textContent.trim() : '';
        });
        if (tc.expected) {
           expect(actualOutput).toBe(tc.expected);
        }
      }
    });
  }

  // --- SPECIAL CASE: LONG INPUT (Pos_Fun_24) ---
  test('Pos_Fun_24: Long Paragraph Input (>300 chars)', async ({ page }) => {
    const longText = 'mama adha udhea naegitalaa balanakota godak vahinavaa eka nisaa mama hithuvaa adha office yannee naethuva gedhara idhan vaeda karanavaa kiyalaa iita passee mama town ekata giyaa podi vaedakata eeka ivaravelaa mama havasa gedhara aavaa';
    
    await page.waitForSelector(INPUT_SELECTOR, { state: 'visible', timeout: 10000 });
    await page.fill(INPUT_SELECTOR, longText, { timeout: 20000 });
    await page.waitForFunction(() => {
      const els = Array.from(document.querySelectorAll('div.whitespace-pre-wrap'));
      return els.some(e => e.textContent && e.textContent.trim().length > 0);
    }, null, { timeout: 15000 });
    const output = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('div.whitespace-pre-wrap'));
      const e = els.find(el => el.textContent && el.textContent.trim().length > 0);
      return e ? e.textContent.trim() : '';
    });

    // Validate start, middle (English word preservation), and end
    expect(output).toContain('මම අද උදේ නැගිටලා');
    expect(output).toContain('office යන්නේ නැතුව');
    expect(output).toContain('හවස ගෙදර ආවා');
  });

  // --- SPECIAL CASE: UI BEHAVIOR (Pos_UI_01) ---
  test('Pos_UI_01: Real-time output update', async ({ page }) => {
    const inputLoc = page.locator(INPUT_SELECTOR);
    // Type "mama" slowly to simulate user typing
    await inputLoc.type('mama', { delay: 100 });

    // Wait for any output container to show non-empty text, then assert
    await page.waitForFunction(() => {
      const els = Array.from(document.querySelectorAll('div.whitespace-pre-wrap'));
      return els.some(e => e.textContent && e.textContent.trim().length > 0);
    }, null, { timeout: 5000 });
    const uiOutput = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('div.whitespace-pre-wrap'));
      const e = els.find(el => el.textContent && el.textContent.trim().length > 0);
      return e ? e.textContent.trim() : '';
    });
    expect(uiOutput).toContain('මම');
  });

});