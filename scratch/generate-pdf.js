const fs = require("fs");
const path = require("path");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size: 595.28 x 841.89

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const width = page.getWidth();
  const height = page.getHeight();
  const margin = 36; // 0.5 inch margins
  const contentWidth = width - margin * 2;

  let y = height - margin;

  const drawText = (text, x, fontSize, font = fontRegular, color = rgb(0, 0, 0)) => {
    page.drawText(text, { x, y, size: fontSize, font, color });
  };

  const drawLine = (yPos) => {
    page.drawLine({
      start: { x: margin, y: yPos },
      end: { x: width - margin, y: yPos },
      thickness: 0.75,
      color: rgb(0.2, 0.2, 0.2),
    });
  };

  // Helper for word wrapping text
  function wrapText(text, fontSize, font, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize);
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  // --- HEADER ---
  // Name
  y -= 14;
  const nameText = "M.Awais Mustafa";
  const nameWidth = fontBold.widthOfTextAtSize(nameText, 18);
  page.drawText(nameText, { x: (width - nameWidth) / 2, y, size: 18, font: fontBold });

  y -= 14;
  const rollText = "(FA22-BSE-065)";
  const rollWidth = fontRegular.widthOfTextAtSize(rollText, 11);
  page.drawText(rollText, { x: (width - rollWidth) / 2, y, size: 11, font: fontRegular });

  y -= 14;
  const contactText = "+92 3145683525 | awaismustafavhr@gmail.com | https://www.linkedin.com/in/muhammad-awais-mustafa-224956319/ |";
  const contactWidth = fontRegular.widthOfTextAtSize(contactText, 8.5);
  page.drawText(contactText, { x: (width - contactWidth) / 2, y, size: 8.5, font: fontRegular, color: rgb(0, 0.2, 0.6) });

  y -= 12;
  const linksText = "https://github.com/awaischoudhary198 | https://github.com/awaismustafavhr?tab=repositories";
  const linksWidth = fontRegular.widthOfTextAtSize(linksText, 8.5);
  page.drawText(linksText, { x: (width - linksWidth) / 2, y, size: 8.5, font: fontRegular, color: rgb(0, 0.2, 0.6) });

  y -= 16;

  // --- SECTION: Professional Summary ---
  page.drawText("Professional Summary", { x: margin, y, size: 11, font: fontBold });
  y -= 3;
  drawLine(y);
  y -= 11;

  const summaryText = "Software Engineering graduate with hands-on experience in web development, data science, and full-stack solutions. Passionate about leveraging cutting-edge technologies to build efficient, user-focused applications that solve real-world challenges. Proficient in Web development, React, Next.js, Node.js, and data-driven methodologies, with a proven ability to collaborate effectively in team environments and deliver impactful results. Eager to contribute to dynamic projects, continuously improve technical skills, and add value to forward-thinking organizations.";
  const summaryLines = wrapText(summaryText, 8.5, fontRegular, contentWidth);
  for (const line of summaryLines) {
    page.drawText(line, { x: margin, y, size: 8.5, font: fontRegular });
    y -= 10.5;
  }

  y -= 4;

  // --- SECTION: Work Experience ---
  page.drawText("Work Experience", { x: margin, y, size: 11, font: fontBold });
  y -= 3;
  drawLine(y);
  y -= 12;

  // Code Desk Studio
  page.drawText("Code Desk Studio", { x: margin, y, size: 9.5, font: fontBold });
  const typeText = "Onsite";
  page.drawText(typeText, { x: width - margin - fontBold.widthOfTextAtSize(typeText, 9.5), y, size: 9.5, font: fontBold });
  y -= 11;

  page.drawText("•   Full Stack Developer", { x: margin + 10, y, size: 9, font: fontBold });
  const expDate = "June– Sep 2025";
  page.drawText(expDate, { x: width - margin - fontRegular.widthOfTextAtSize(expDate, 9), y, size: 9, font: fontRegular });
  y -= 11;

  const expBullets = [
    "Developed frontend and backend for production app and websites using javascript and Node.js, Next.js.",
    "Contributed to multiple projects, collaborating with frontend and backend teams, while gaining basic frontend design knowledge and actively contributing to daily meetings for updates and issue resolution."
  ];

  for (const bullet of expBullets) {
    const lines = wrapText(bullet, 8.5, fontRegular, contentWidth - 40);
    page.drawText("o", { x: margin + 30, y, size: 7, font: fontRegular });
    for (let i = 0; i < lines.length; i++) {
      page.drawText(lines[i], { x: margin + 40, y, size: 8.5, font: fontRegular });
      y -= 10;
    }
  }

  y -= 4;

  // --- SECTION: Projects ---
  page.drawText("Projects", { x: margin, y, size: 11, font: fontBold });
  y -= 3;
  drawLine(y);
  y -= 12;

  const projects = [
    {
      title: "Connect & Learn",
      tech: "React, Node, Express, Mongodb, Tailwind css",
      role: "Web-Developer",
      date: "Jan 2024 - Sep 2024",
      bullets: [
        "Developed Connect and Learn benefits users by offering collaborative learning, skill exchange, personalized tutoring, real-world project opportunities and innovative project ideas space.",
        "The platform serves as an innovation hub, fostering creativity and creating a connected ecosystem for users to engage, excel, and advance their educational and professional pursuits."
      ]
    },
    {
      title: "Online blood donation request portal (FYP)",
      tech: "React.js, Mongodb, node.js",
      role: "Web-Developer",
      date: "Aug 2025 - June 2026",
      bullets: [
        "Developed an online blood donation request portal using React.js, Node.js, and MongoDB, enabling donors and recipients to manage blood requests and donations through a responsive web interface.",
        "Implemented role-based access control for four user roles (Donor, Recipient, Medical Admin, System Admin) with dedicated dashboards and secure authentication/authorization.."
      ]
    },
    {
      title: "Finance Tracker Web",
      tech: "React.js, Angular, mongodb, node.js",
      role: "Web-Developer",
      date: "Nov 2025 - Dec 2025",
      bullets: [
        "Built a Finance Tracker web application with a modern UI using React.js and Angular, enabling users to record income/expenses, categorize transactions, and view spending summaries.",
        "Developed a scalable backend using Node.js and MongoDB, designing RESTful APIs for secure CRUD operations, filtering, and reporting.",
        "Implemented data validation and optimized API performance to ensure accurate financial tracking and smooth user experience."
      ]
    },
    {
      title: "Task Manager App",
      tech: "Flutter, supabase",
      role: "App-Developer",
      date: "Jan 2025 - March 2025",
      bullets: [
        "Developed a cross-platform Task Manager mobile app using Flutter, allowing users to create, update, and organize tasks with due dates and priority levels.",
        "Implemented core features such as task status tracking (To-Do/In Progress/Done), reminders/notifications, and a clean, responsive UI for Android and iOS."
      ]
    },
    {
      title: "University Complaint Mgt System",
      tech: "Flutter, supabase",
      role: "App-Developer",
      date: "Jan 2025 - April 2025",
      bullets: [
        "Designed and developed a University Complaint Management System mobile application using Flutter, allowing students to safely register and submit complaints/requests against departments, faculty, teachers, or HODs.",
        "Developed role-based workflows for assigning, reviewing, escalating, and resolving complaints, with real-time status updates and notifications."
      ]
    }
  ];

  for (const proj of projects) {
    page.drawText(`•   ${proj.title}`, { x: margin + 10, y, size: 9, font: fontBold });
    page.drawText(proj.tech, { x: width - margin - fontBold.widthOfTextAtSize(proj.tech, 9), y, size: 9, font: fontBold });
    y -= 10.5;

    page.drawText(proj.role, { x: margin + 25, y, size: 8.5, font: fontItalic });
    page.drawText(proj.date, { x: width - margin - fontRegular.widthOfTextAtSize(proj.date, 8.5), y, size: 8.5, font: fontRegular });
    y -= 10;

    for (const bullet of proj.bullets) {
      const lines = wrapText(bullet, 8, fontRegular, contentWidth - 40);
      page.drawText("o", { x: margin + 30, y, size: 6.5, font: fontRegular });
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], { x: margin + 40, y, size: 8, font: fontRegular });
        y -= 9.5;
      }
    }
    y -= 2;
  }

  y -= 2;

  // --- SECTION: Skills ---
  page.drawText("Skills", { x: margin, y, size: 11, font: fontBold });
  y -= 3;
  drawLine(y);
  y -= 11;

  page.drawText("Web Development", { x: margin, y, size: 8.5, font: fontBold });
  page.drawText(" (Node JS, React JS, Next JS, Angular JS, Express JS, MVC Architecture, Rest APIs, Tailwind CSS)", { x: margin + fontBold.widthOfTextAtSize("Web Development", 8.5), y, size: 8.5, font: fontRegular });
  y -= 10.5;

  page.drawText("Programming Languages", { x: margin, y, size: 8.5, font: fontBold });
  page.drawText(" (C++, Basics of Python, JavaScript, Flutter, Mongodb)", { x: margin + fontBold.widthOfTextAtSize("Programming Languages", 8.5), y, size: 8.5, font: fontRegular });
  y -= 12;

  // --- SECTION: Education ---
  page.drawText("Education", { x: margin, y, size: 11, font: fontBold });
  y -= 3;
  drawLine(y);
  y -= 11;

  page.drawText("Comsats University Islamabad (Vehari campus)", { x: margin, y, size: 8.5, font: fontBold });
  page.drawText(" B.S Software Engineering (CGPA 2.85 / 4)", { x: margin + fontBold.widthOfTextAtSize("Comsats University Islamabad (Vehari campus)", 8.5), y, size: 8.5, font: fontRegular });
  const eduDate = "2022 – 2026";
  page.drawText(eduDate, { x: width - margin - fontRegular.widthOfTextAtSize(eduDate, 8.5), y, size: 8.5, font: fontRegular });
  y -= 10.5;

  page.drawText("Relevant Coursework", { x: margin, y, size: 8.5, font: fontBold });
  page.drawText(" (OOP’s, Data Structures, Database Systems, Software Design & Analysis, Web Programming, Data", { x: margin + fontBold.widthOfTextAtSize("Relevant Coursework", 8.5), y, size: 8.5, font: fontRegular });
  y -= 10;
  page.drawText("Science, Information Retrieval)", { x: margin, y, size: 8.5, font: fontRegular });
  y -= 12;

  // --- SECTION: Hobbies and Interests ---
  page.drawText("Hobbies and Interests", { x: margin, y, size: 11, font: fontBold });
  y -= 3;
  drawLine(y);
  y -= 11;

  const hobbies = [
    "•   Problem Solving",
    "•   Photography",
    "•   Traveling",
    "•   Cricket"
  ];
  const colWidth = contentWidth / 4;
  hobbies.forEach((hb, i) => {
    page.drawText(hb, { x: margin + i * colWidth + 10, y, size: 8.5, font: fontRegular });
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, "..", "public", "resume.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log("PDF created successfully at: " + outputPath);
}

generateResume().catch(console.error);
