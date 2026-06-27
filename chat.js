const profile = {
  name: 'Ntsika Ngilane',
  preferredName: 'Calvin',
  role: 'Founder • Software / AI / Web Developer',
  email: 'workngilane@gmail.com',
  phone: '+27 68 928 0010',
  whatsapp: 'https://wa.me/27689280010',
  github: 'https://github.com/Ntsika-Ngilane-dev',
  location: 'Pretoria, Gauteng, South Africa',
  focus: ['web development', 'mobile development', 'AI', 'software engineering', '3D experiences', 'full-stack development'],
  skills: ['JavaScript', 'Python', 'HTML', 'CSS', 'React Native', 'Angular', 'Node.js', 'Express.js', 'MongoDB', 'SQL', 'TypeScript', 'Three.js', 'Blender', 'Figma'],
  projects: [
    'Bookstore Inventory Manager OpenLibrary',
    'DevFolio',
    'Facial-Rec',
    'task_tracker_app',
    'portfolio website',
    'Mood-Based Strain Recommender App'
  ],
  education: ['Higher Certificate in Web & App Development at CodeSpace', 'Self-taught through freeCodeCamp, Codecademy, YouTube, and documentation'],
  bio: 'I’m Ntsika Ngilane, though most people know me as Calvin. I’m a founder and software, AI, and web developer focused on building practical digital products that solve real problems.'
};

const assistantBody = document.getElementById('assistant-body');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const assistantToggle = document.getElementById('assistant-toggle');
const assistantCard = document.getElementById('assistant-card');
const assistantClose = document.getElementById('assistant-close');

let opened = false;

function addMessage(text, sender = 'bot') {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getReply(input) {
  const text = input.toLowerCase().trim();

  if (!text) return "I can help with info about Calvin, his projects, or contacting him on WhatsApp.";

  if (/(about|who|profile|background|bio|introduc)/.test(text)) {
    return `${profile.bio} He is currently focused on ${profile.focus.slice(0, 4).join(', ')}.`;
  }

  if (/(skill|stack|tech|language|framework|tool)/.test(text)) {
    return `Calvin works with ${profile.skills.join(', ')}.`;
  }

  if (/(project|portfolio|work|repo|repository)/.test(text)) {
    return `Recent projects include ${profile.projects.join(', ')}. You can also visit his GitHub profile at ${profile.github}.`;
  }

  if (/(education|study|code space|certificate)/.test(text)) {
    return `He is studying for a ${profile.education[0]} and also learning through ${profile.education[1].toLowerCase()}.`;
  }

  if (/(contact|email|phone|whatsapp|reach|call|message)/.test(text)) {
    return `You can reach Calvin at ${profile.email} or on WhatsApp: ${profile.whatsapp}.`;
  }

  if (/(hello|hi|hey)/.test(text)) {
    return `Hello! I can answer questions about Calvin’s background, skills, projects, and help you contact him on WhatsApp.`;
  }

  if (/(thank|thanks)/.test(text)) {
    return `You’re welcome. If you want, I can also help you draft a message to him.`;
  }

  return `I can share details about Calvin’s background, projects, technical skills, and how to contact him. Try asking about his projects, tech stack, or WhatsApp.`;
}

function handleSubmit(event) {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  chatInput.value = '';

  const reply = getReply(message);

  if (/(whatsapp|message|contact|reach|call)/i.test(message)) {
    window.open(profile.whatsapp, '_blank', 'noopener,noreferrer');
  }

  setTimeout(() => addMessage(reply, 'bot'), 250);
}

chatForm.addEventListener('submit', handleSubmit);

function toggleChat() {
  opened = !opened;
  assistantCard.style.display = opened ? 'block' : 'none';
  assistantToggle.setAttribute('aria-expanded', String(opened));
}

assistantToggle.addEventListener('click', toggleChat);
assistantClose.addEventListener('click', toggleChat);

document.querySelectorAll('.quick-reply').forEach((button) => {
  button.addEventListener('click', () => {
    const message = button.getAttribute('data-message');
    chatInput.value = message;
    chatInput.focus();
  });
});

assistantCard.style.display = 'none';
