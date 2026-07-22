const fs = require("fs");
const path = require("path");

function createPdf() {
  const contentCommands = [];

  // Helper functions to generate PDF operators
  function text(str, x, y, font = "/F1", size = 10, rgbColor = [0, 0, 0]) {
    // Escape parentheses and backslashes in PDF text strings
    const escaped = str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    contentCommands.push(
      `BT ${rgbColor[0]} ${rgbColor[1]} ${rgbColor[2]} rg ${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escaped}) Tj ET`
    );
  }

  function line(x1, y1, x2, y2, strokeColor = [0.2, 0.2, 0.2], width = 0.75) {
    contentCommands.push(
      `${strokeColor[0]} ${strokeColor[1]} ${strokeColor[2]} RG ${width} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`
    );
  }

  const width = 595.28;
  const height = 841.89;
  const margin = 36;
  const contentWidth = width - margin * 2;

  let y = height - 36;

  // Header - Name
  text("M.Awais Mustafa", 225, y, "/F2", 18, [0, 0, 0]);
  y -= 16;
  text("(FA22-BSE-065)", 255, y, "/F1", 11, [0, 0, 0]);
  y -= 14;
  text("+92 3145683525 | awaismustafavhr@gmail.com | https://www.linkedin.com/in/muhammad-awais-mustafa-224956319/ |", 70, y, "/F1", 8.5, [0, 0.2, 0.6]);
  y -= 12;
  text("https://github.com/awaischoudhary198 | https://github.com/awaismustafavhr?tab=repositories", 100, y, "/F1", 8.5, [0, 0.2, 0.6]);
  y -= 18;

  // Professional Summary
  text("Professional Summary", margin, y, "/F2", 11, [0, 0, 0]);
  y -= 3;
  line(margin, y, width - margin, y);
  y -= 12;

  text("Software Engineering graduate with hands-on experience in web development, data science, and full-stack solutions. Passionate", margin, y, "/F1", 8.5);
  y -= 10.5;
  text("about leveraging cutting-edge technologies to build efficient, user-focused applications that solve real-world challenges. Proficient", margin, y, "/F1", 8.5);
  y -= 10.5;
  text("in Web development, React, Next.js, Node.js, and data-driven methodologies, with a proven ability to collaborate effectively in team", margin, y, "/F1", 8.5);
  y -= 10.5;
  text("environments and deliver impactful results. Eager to contribute to dynamic projects, continuously improve technical skills, and", margin, y, "/F1", 8.5);
  y -= 10.5;
  text("add value to forward-thinking organizations.", margin, y, "/F1", 8.5);
  y -= 16;

  // Work Experience
  text("Work Experience", margin, y, "/F2", 11, [0, 0, 0]);
  y -= 3;
  line(margin, y, width - margin, y);
  y -= 12;

  text("Code Desk Studio", margin, y, "/F2", 9.5);
  text("Onsite", width - margin - 35, y, "/F2", 9.5);
  y -= 11;

  text("\u2022   Full Stack Developer", margin + 10, y, "/F2", 9);
  text("June\u2013 Sep 2025", width - margin - 75, y, "/F1", 9);
  y -= 11;

  text("o     Developed frontend and backend for production app and websites using javascript and Node.js, Next.js.", margin + 25, y, "/F1", 8.5);
  y -= 10;
  text("o     Contributed to multiple projects, collaborating with frontend and backend teams, while gaining basic frontend", margin + 25, y, "/F1", 8.5);
  y -= 10;
  text("       design knowledge and actively contributing to daily meetings for updates and issue resolution.", margin + 25, y, "/F1", 8.5);
  y -= 14;

  // Projects
  text("Projects", margin, y, "/F2", 11, [0, 0, 0]);
  y -= 3;
  line(margin, y, width - margin, y);
  y -= 12;

  // Project 1
  text("\u2022   Connect & Learn", margin + 10, y, "/F2", 9);
  text("React, Node, Express, Mongodb, Tailwind css", width - margin - 205, y, "/F2", 9);
  y -= 10.5;
  text("Web-Developer", margin + 25, y, "/F3", 8.5);
  text("Jan 2024 - Sep 2024", width - margin - 85, y, "/F1", 8.5);
  y -= 10;
  text("o     Developed Connect and Learn benefits users by offering collaborative learning, skill exchange, personalized", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       tutoring, real-world project opportunities and innovative project ideas space.", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("o     The platform serves as an innovation hub, fostering creativity and creating a connected ecosystem for users to", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       engage, excel, and advance their educational and professional pursuits.", margin + 25, y, "/F1", 8);
  y -= 12;

  // Project 2
  text("\u2022   Online blood donation request portal (FYP)", margin + 10, y, "/F2", 9);
  text("React.js,Mongodb,node.js", width - margin - 125, y, "/F2", 9);
  y -= 10.5;
  text("Web-Developer", margin + 25, y, "/F3", 8.5);
  text("Aug 2025 - June 2026", width - margin - 95, y, "/F1", 8.5);
  y -= 10;
  text("o     Developed an online blood donation request portal using React.js, Node.js, and MongoDB, enabling donors", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       and recipients to manage blood requests and donations through a responsive web interface.", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("o     Implemented role-based access control for four user roles (Donor, Recipient, Medical Admin, System Admin)", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       with dedicated dashboards and secure authentication/authorization..", margin + 25, y, "/F1", 8);
  y -= 12;

  // Project 3
  text("\u2022   Finance Tracker Web", margin + 10, y, "/F2", 9);
  text("React.js,Angular,mongodb,node.js", width - margin - 170, y, "/F2", 9);
  y -= 10.5;
  text("Web-Developer", margin + 25, y, "/F3", 8.5);
  text("Nov 2025 - Dec 2025", width - margin - 85, y, "/F1", 8.5);
  y -= 10;
  text("o     Built a Finance Tracker web application with a modern UI using React.js and Angular, enabling users to", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       record income/expenses, categorize transactions, and view spending summaries.", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("o     Developed a scalable backend using Node.js and MongoDB, designing RESTful APIs for secure CRUD", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       operations, filtering, and reporting.", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("o     Implemented data validation and optimized API performance to ensure accurate financial tracking and smooth", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       user experience.", margin + 25, y, "/F1", 8);
  y -= 12;

  // Project 4
  text("\u2022   Task Manager App", margin + 10, y, "/F2", 9);
  text("Flutter,supabase", width - margin - 85, y, "/F2", 9);
  y -= 10.5;
  text("App-Developer", margin + 25, y, "/F3", 8.5);
  text("Jan 2025 - March 2025", width - margin - 95, y, "/F1", 8.5);
  y -= 10;
  text("o     Developed a cross-platform Task Manager mobile app using Flutter, allowing users to create, update, and organize", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       tasks with due dates and priority levels.", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("o     Implemented core features such as task status tracking (To-Do/In Progress/Done), reminders/notifications, and a", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       clean, responsive UI for Android and iOS.", margin + 25, y, "/F1", 8);
  y -= 12;

  // Project 5
  text("\u2022   University Complaint Mgt System", margin + 10, y, "/F2", 9);
  text("Flutter,supabase", width - margin - 85, y, "/F2", 9);
  y -= 10.5;
  text("App-Developer", margin + 25, y, "/F3", 8.5);
  text("Jan 2025 - April 2025", width - margin - 90, y, "/F1", 8.5);
  y -= 10;
  text("o     Designed and developed a University Complaint Management System mobile application using Flutter, allowing", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       students to safely register and submit complaints/requests against departments, faculty, teachers, or HODs.", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("o     Developed role-based workflows for assigning, reviewing, escalating, and resolving complaints, with real-time", margin + 25, y, "/F1", 8);
  y -= 9.5;
  text("       status updates and notifications.", margin + 25, y, "/F1", 8);
  y -= 14;

  // Skills
  text("Skills", margin, y, "/F2", 11, [0, 0, 0]);
  y -= 3;
  line(margin, y, width - margin, y);
  y -= 12;

  text("Web Development", margin, y, "/F2", 8.5);
  text(" (Node JS, React JS, Next JS, Angular JS, Express JS, MVC Architecture, Rest APIs, Tailwind CSS)", margin + 78, y, "/F1", 8.5);
  y -= 10.5;
  text("Programming Languages", margin, y, "/F2", 8.5);
  text(" (C++, Basics of Python, JavaScript, Flutter, Mongodb)", margin + 110, y, "/F1", 8.5);
  y -= 14;

  // Education
  text("Education", margin, y, "/F2", 11, [0, 0, 0]);
  y -= 3;
  line(margin, y, width - margin, y);
  y -= 12;

  text("Comsats University Islamabad (Vehari campus)", margin, y, "/F2", 8.5);
  text(" B.S Software Engineering (CGPA 2.85 / 4)", margin + 205, y, "/F1", 8.5);
  text("2022 \u2013 2026", width - margin - 55, y, "/F1", 8.5);
  y -= 10.5;
  text("Relevant Coursework", margin, y, "/F2", 8.5);
  text(" (OOP\u2019s, Data Structures, Database Systems, Software Design & Analysis, Web Programming, Data", margin + 90, y, "/F1", 8.5);
  y -= 10;
  text("Science, Information Retrieval)", margin, y, "/F1", 8.5);
  y -= 14;

  // Hobbies and Interests
  text("Hobbies and Interests", margin, y, "/F2", 11, [0, 0, 0]);
  y -= 3;
  line(margin, y, width - margin, y);
  y -= 12;

  text("\u2022   Problem Solving", margin + 30, y, "/F1", 8.5);
  text("\u2022   Photography", margin + 160, y, "/F1", 8.5);
  text("\u2022   Traveling", margin + 280, y, "/F1", 8.5);
  text("\u2022   Cricket", margin + 390, y, "/F1", 8.5);

  const streamContent = contentCommands.join("\n");
  const streamLength = Buffer.byteLength(streamContent);

  // Build PDF Objects
  const objects = [];
  objects[1] = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`;
  objects[2] = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`;
  objects[3] = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources 4 0 R /Contents 5 0 R >>\nendobj`;
  objects[4] = `4 0 obj\n<< /Font << /F1 6 0 R /F2 7 0 R /F3 8 0 R >> >>\nendobj`;
  objects[5] = `5 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj`;
  objects[6] = `6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`;
  objects[7] = `7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj`;
  objects[8] = `8 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj`;

  let pdfString = `%PDF-1.4\n`;
  const xrefOffsets = [];

  for (let i = 1; i <= 8; i++) {
    xrefOffsets[i] = Buffer.byteLength(pdfString);
    pdfString += objects[i] + `\n`;
  }

  const startXref = Buffer.byteLength(pdfString);
  pdfString += `xref\n0 9\n0000000000 65535 f \n`;
  for (let i = 1; i <= 8; i++) {
    pdfString += String(xrefOffsets[i]).padStart(10, "0") + ` 00000 n \n`;
  }
  pdfString += `trailer\n<< /Size 9 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

  const outputPath = path.join(__dirname, "..", "public", "resume.pdf");
  fs.writeFileSync(outputPath, pdfString, "latin1");
  console.log("SUCCESS! Created valid PDF resume at: " + outputPath);
}

createPdf();
