const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36"
  );
  // Indeed.com Job Board
  await page.goto(
    "https://www.indeed.com/jobs?q=junior+developer&l=Remote&vjk=73dedf70e7ca6087"
  );

  const indeedJobs = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("#mosaic-provider-jobcards .slider_container"),
      (e) => ({
        jobTitle: e.querySelector(".jcs-JobTitle").innerText,
        companyName: e.querySelector(".companyName").innerText,
        companyLocation: e.querySelector(".companyLocation").innerText,
        date: e.querySelector(".date").innerText,
        url: e.querySelector(".jcs-JobTitle").href,
      })
    )
  );

  // Save data to JSON file
  fs.writeFile("indeedJobs.json", JSON.stringify(indeedJobs), (err) => {
    if (err) throw err;
    console.log("File saved");
  });

  await page.goto(
    "https://talent.hubstaff.com/search/jobs?search%5Bkeywords%5D=&page=1&search%5Btype%5D=&search%5Blast_slider%5D=&search%5Bnewer_than%5D=&search%5Bnewer_than%5D=&search%5Bpayrate_start%5D=1&search%5Bpayrate_end%5D=100%2B&search%5Bpayrate_null%5D=0&search%5Bpayrate_null%5D=1&search%5Bbudget_start%5D=1&search%5Bbudget_end%5D=100000%2B&search%5Bbudget_null%5D=0&search%5Bbudget_null%5D=1&search%5Bexperience_level%5D=1&search%5Bcountries%5D%5B%5D=&search%5Blanguages%5D%5B%5D=&search%5Bsort_by%5D=relevance"
  );

  const hubJobs = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".content-section .search-result"),
      (e) => ({
        jobTitle: e.querySelector(".name").innerText,
        companyName: e.querySelector(".job-company a").innerText,
        companyDescription: e.querySelector(".profil-bio").innerText,
        url: e.querySelector(".name").href,
      })
    )
  );

  // Save data to JSON file
  fs.writeFile("hubJobs.json", JSON.stringify(hubJobs), (err) => {
    if (err) throw err;
    console.log("File saved");
  });

  await browser.close();
}

run();
