# job-board-web-scraper

Web scraper of indeed.com, hubstaff.com & dice.com job board postings using Puppeteer. Complete project has script to scrape 3 job boards, save data as 3 JSON files which are then displayed using Node with Express (EJS template engine).

![Alt text](https://github.com/Taaaaab/personal-portfolio/blob/main/src/assets/job-board.png?raw=true 'Screenshot')

## Requirements

- node.js version >= 18.15.0

## Installation

1. Clone this project:
   `https://github.com/Taaaaab/job-board-web-scraper.git`

2. Once you have cloned this project, you can install the required dependencies by using:

   ```
   cd job-board-web-scraper
   npm install
   ```

3. A live demo of the project can be started by using:

```
npm start
```

## Usage

Can run web-scraper separately by cloning repository, installing dependencies and modifying web-scraper.js file:

1. To run web-scraper separately:

   ```
   cd src/
   ```

2. Uncomment `// runScrape();` line at the bottom of web-scraper.js (line 86)

3. Run the web-scraper.js file

   ```
   node web-scraper.js
   ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
