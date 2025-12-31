const output = document.getElementById("terminal-output");
const input = document.getElementById("command-input");
const cursor = document.querySelector(".cursor");
const line  = document.querySelector(".input-line");
const commandHistory = [];
let historyIndex = -1;

// Update cursor position based on input text
function updateCursorPosition() {
  const text = input.value.substring(0, input.selectionStart);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '14px Courier New';
  const width = context.measureText(text).width;
  cursor.style.left = width + 'px';
}

// Listen for input changes
input.addEventListener('input', updateCursorPosition);
input.addEventListener('click', updateCursorPosition);
input.addEventListener('keyup', updateCursorPosition);

const portfolioData = {
  name: "Obaid Allah Ben Ali",
  username: "obaid28",
  role: "Full Stack Developer",
  location: "Tunisia",
  email: "b.obaid28@gmail.com",
  leetcode: "https://leetcode.com/u/obaid_28/",
  github: "https://github.com/obaid-ba",
  linkedin: "https://www.linkedin.com/in/obaid-allah-ben-ali-42b477201/",
  twitter: "https://x.com/Obaidallah28",
  website: "https://yourwebsite.com",
  bio: "I'm a developer with experience in building websites for small and medium sized businesses.Passionate developer who loves building amazing things with code.",
  skills: [
    "JavaScript | HTML | CSS",
    "Python",
    "C",
    "PHP",
    "Django",
    "React.js",
    "Node.js",
    "Git",
    "MongoDB",
  ],
  projects: [
    {
      name: "Products_Management",
      description: "A complete Django-based product management web application that allows you to add, edit, list, and delete products with images, descriptions, and prices. The interface is clean, modern, and responsive — perfect for small businesses or personal projects.",
      tech: "python ,Django, HTML, CSS",
      link: "https://github.com/obaid-ba/Products_Management",
    },
    {
      name: "Random_quotes_generator",
      description: "this application generate quotes faster and easy",
      tech: "html, CSS, JavaScript",
      link: "https://github.com/obaid-ba/Random_quotes_generator",
    },
    {
      name: "Java_Student_Management",
      description: "This repository contains a simple Java console application for managing students and groups with a MySQL database backend. It supports creating, updating, listing, searching, and deleting students, as well as displaying group registers and listing available groups",
      tech: "mySQL, Java",
      link: "https://github.com/obaid-ba/Java_Student_Management",
    },
  ]
};

const commands = {
  help: () => {
    return `
<div class="command-list">
<span class="cmd-name">about</span><span class="cmd-desc">/* Who is ${portfolioData.name}? */</span>
<span class="cmd-name">social</span><span class="cmd-desc">/* Display social networks */</span>
<span class="cmd-name">projects</span><span class="cmd-desc">/* View coding projects */</span>
<span class="cmd-name">secret</span><span class="cmd-desc">/* Find the password */</span>
<span class="cmd-name">help</span><span class="cmd-desc">/* You obviously already know what this does */</span>
<span class="cmd-name">clear</span><span class="cmd-desc">/* Clear terminal */</span>
<span class="cmd-name">banner</span><span class="cmd-desc">/* Display the header */</span>
</div>`;
  },

  about: () => {
    return `
<div class="section-title">About ${portfolioData.name}</div> <br>

<span class="highlight">Name:</span>       ${portfolioData.name}<br>
<span class="highlight">Role:</span>       ${portfolioData.role}<br>
<span class="highlight">Location:</span>   ${portfolioData.location}<br>
${portfolioData.bio} <br>
<span class="section-title">Skills:</span>
${portfolioData.skills.join(" • ")}
`;
  },
  social: () => {
    return `
<div class="cmd-name">Social Networks</div><br>

<span class="highlight">GitHub:</span>    <a href="${portfolioData.github}" target="_blank">${portfolioData.github}</a><br>
<span class="highlight">Leetcode:</span>    <a href="${portfolioData.leetcode}" target="_blank">${portfolioData.leetcode}</a><br>
<span class="highlight">LinkedIn:</span>  <a href="${portfolioData.linkedin}" target="_blank">${portfolioData.linkedin}</a><br>
<span class="highlight">Twitter:</span>   <a href="${portfolioData.twitter}" target="_blank">${portfolioData.twitter}</a><br>
<span class="highlight">Website:</span>   <a href="${portfolioData.website}" target="_blank">${portfolioData.website}</a><br>
<span class="highlight">Email:</span>   <a href="mailto:${portfolioData.email}">${portfolioData.email}</a><br>

`;
  },

  secret: () => {
    return `<span class="error">Access Denied.</span> Nice try though! 😉`;
  },

  projects: () => {
    return `
<div class="section-title">Coding Projects</div>
  ${portfolioData.projects.map((project, i) => `
    <span class="highlight">${i + 1}. ${project.name}</span> ${project.description} <br>
    <span class="cmd-name">Tech:</span> ${project.tech}<br>
    <span class="cmd-name">Link:</span> 
    <a href="${project.link}" target="_blank">${project.link}</a> <br>
`
)
.join("\n")}`;
  },


  banner: () => {
    return `
<pre class="banner">
 ██████╗ ██████╗  █████╗ ██╗██████╗ ██████╗  █████╗ 
██╔═══██╗██╔══██╗██╔══██╗██║██╔══██╗╚════██╗██╔══██╗
██║   ██║██████╔╝███████║██║██║  ██║ █████╔╝╚█████╔╝
██║   ██║██╔══██╗██╔══██║██║██║  ██║██╔═══╝ ██╔══██╗
╚██████╔╝██████╔╝██║  ██║██║██████╔╝███████╗╚█████╔╝
 ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝ ╚════╝ 
</pre>

Welcome to ${portfolioData.name}'s portfolio!
Type '<span class="command">help</span>' to see available commands.
`;
  },

  clear: () => {
    output.innerHTML = "";
    return "";
  },
};

function addOutput(text, isCommand = false) {
  const line = document.createElement("div");
  line.className = "output-line";
  if (isCommand) {
    line.innerHTML = `<span class="prompt">Obaid28@portfolio:~$</span> <span class="command">${text}</span>`;
  } else {
    line.innerHTML = text;
  }
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function processCommand(cmd) {
  const trimmedCmd = cmd.trim().toLowerCase();
  addOutput(cmd, true);
  if (trimmedCmd === "") {
    return;
  }
  commandHistory.unshift(cmd);
  historyIndex = -1;
  if (commands[trimmedCmd]) {
    const result = commands[trimmedCmd]();
    if (result) {
      addOutput(result);
    }
  } else {
    addOutput(`<span class="error">Command not found: ${cmd}</span>
Type '<span class="command">help</span>' for available commands.`);
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value;
    processCommand(cmd);
    input.value = "";
    updateCursorPosition();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[historyIndex];
      updateCursorPosition();
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[historyIndex];
      updateCursorPosition();
    } else if (historyIndex === 0) {
      historyIndex = -1;
      input.value = "";
      updateCursorPosition();
    }
  } else if (e.key === "Tab") {
    e.preventDefault();
    const partial = input.value.toLowerCase();
    const matches = Object.keys(commands).filter((cmd) =>
      cmd.startsWith(partial)
    );
    if (matches.length >= 1) {
      input.value = matches[0];
      updateCursorPosition();
    }
  }
});

setTimeout(() => {
  input.focus();
}, 100);

document.addEventListener("click", () => {
  input.focus();
});

// Initialize cursor position
updateCursorPosition();