const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36"
  );
  await page.goto(
    "https://www.indeed.com/jobs?q=junior+developer&l=Remote&vjk=73dedf70e7ca6087"
  );

  const jobs = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("#mosaic-provider-jobcards .slider_container"),
      (e) => ({
        jobTitle: e.querySelector(".jcs-JobTitle").innerText,
        companyName: e.querySelector(".companyName").innerText,
        companyLocation: e.querySelector(".companyLocation").innerText,
        date: e.querySelector(".date").innerText,
      })
    )
  );

  console.log(jobs);

  // Save data to JSON file
  fs.writeFile("jobs.json", JSON.stringify(jobs), (err) => {
    if (err) throw err;
    console.log("File saved");
  });

  await browser.close();
}

run();
