// ── DOM References ──
const categoryInput = document.getElementById('categoryInput');
const complexitySlider = document.getElementById('complexitySlider');
const strategySlider = document.getElementById('strategySlider');
const genzSlider = document.getElementById('genzSlider');
const complexityValue = document.getElementById('complexityValue');
const strategyValue = document.getElementById('strategyValue');
const genzValue = document.getElementById('genzValue');
const generateBtn = document.getElementById('generateBtn');
const outputSection = document.getElementById('outputSection');
const generatedQuestion = document.getElementById('generatedQuestion');
const copyBtn = document.getElementById('copyBtn');

// ── Slider value display ──
complexitySlider.addEventListener('input', () => {
  complexityValue.textContent = complexitySlider.value;
});
strategySlider.addEventListener('input', () => {
  strategyValue.textContent = strategySlider.value;
});
genzSlider.addEventListener('input', () => {
  genzValue.textContent = genzSlider.value;
});

// ── Enable / disable generate button ──
categoryInput.addEventListener('input', () => {
  generateBtn.disabled = categoryInput.value.trim() === '';
});

// ── Question generation ──
generateBtn.addEventListener('click', () => {
  const category = categoryInput.value.trim();
  if (!category) return;

  generateBtn.classList.add('loading');
  generateBtn.textContent = 'Generating...';

  // Simulate a brief delay for perceived quality
  setTimeout(() => {
    const question = buildQuestion(
      category,
      parseInt(complexitySlider.value),
      parseInt(strategySlider.value),
      parseInt(genzSlider.value)
    );

    generatedQuestion.textContent = question;
    outputSection.classList.add('visible');
    generateBtn.classList.remove('loading');
    generateBtn.textContent = 'Generate Question';
  }, 600);
});

// ── Enter key triggers generation ──
categoryInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !generateBtn.disabled) {
    generateBtn.click();
  }
});

// ── Copy to clipboard ──
copyBtn.addEventListener('click', () => {
  const text = generatedQuestion.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.classList.add('copied');
    setTimeout(() => copyBtn.classList.remove('copied'), 1500);
  });
});

// ── Question Bank ──
// Organized by complexity × strategic focus, with Gen Z overlay applied after

const questionTemplates = {
  // complexity 1-2, strategy 1-2 (simple + tactical)
  simpleTactical: [
    "What's one practical tool or platform your team uses for {category} that you'd recommend?",
    "How does your organization currently handle {category} on a day-to-day basis?",
    "What's the biggest challenge your HR team faces with {category} right now?",
    "Can you share a quick win your team achieved recently related to {category}?",
    "What's one thing you'd change about how your company approaches {category} today?",
    "How are you measuring success with {category} in your organization?",
    "What does your current workflow look like for {category}?",
    "What immediate improvements have you seen after adopting AI for {category}?",
  ],

  // complexity 1-2, strategy 3 (simple + balanced)
  simpleBalanced: [
    "How do you see {category} evolving in HR over the next couple of years?",
    "What advice would you give to an HR team just starting to think about {category}?",
    "How do you balance the human element with technology when it comes to {category}?",
    "What role does employee feedback play in shaping your approach to {category}?",
    "Where should HR professionals focus their learning when it comes to {category}?",
    "How is {category} changing the way employees experience work at your organization?",
  ],

  // complexity 1-2, strategy 4-5 (simple + visionary)
  simpleVisionary: [
    "Where do you think {category} will be in five years for HR?",
    "How might {category} fundamentally change the employee experience?",
    "What's the most exciting possibility you see for {category} in the future of work?",
    "Do you think {category} will eventually replace traditional HR processes entirely?",
    "What should companies start doing now to prepare for the future of {category}?",
    "How could {category} reshape the relationship between employees and organizations?",
  ],

  // complexity 3, strategy 1-2 (moderate + tactical)
  moderateTactical: [
    "When implementing AI-driven {category}, what change management strategies have proven most effective for getting frontline HR teams on board?",
    "How are you navigating data privacy and compliance concerns as you integrate AI into {category} processes?",
    "What metrics and KPIs have you established to evaluate the ROI of AI-enabled {category} initiatives?",
    "How does your organization ensure that AI tools for {category} don't perpetuate existing biases in HR decision-making?",
    "What integration challenges have you encountered connecting AI {category} solutions with your existing HRIS and tech stack?",
    "How are you training and upskilling your HR team to effectively leverage AI for {category}?",
  ],

  // complexity 3, strategy 3 (moderate + balanced)
  moderateBalanced: [
    "How do you strike the right balance between AI automation and human judgment in {category}, and where do you draw the line?",
    "What organizational structures or governance models have you found effective for managing AI-driven {category} at scale?",
    "How is AI-enabled {category} reshaping the competencies and career paths of HR professionals in your organization?",
    "What role does cross-functional collaboration between HR, IT, and business units play in successful {category} implementations?",
    "How are you ensuring that AI solutions for {category} serve both organizational efficiency and genuine employee wellbeing?",
    "What frameworks do you use to evaluate whether to build, buy, or partner for AI {category} solutions?",
  ],

  // complexity 3, strategy 4-5 (moderate + visionary)
  moderateVisionary: [
    "How do you envision AI-driven {category} transforming the fundamental nature of the HR function over the next decade?",
    "What emerging technologies beyond current AI capabilities could further revolutionize {category} in the employee experience?",
    "How might AI-enabled {category} shift the power dynamic between employers and employees in the future workforce?",
    "What new roles or functions within HR do you anticipate emerging as AI takes over routine {category} tasks?",
    "How could AI-driven {category} contribute to building more equitable and inclusive workplaces at a systemic level?",
    "What would a fully AI-integrated approach to {category} look like, and what uniquely human elements must be preserved?",
  ],

  // complexity 4-5, strategy 1-2 (expert + tactical)
  expertTactical: [
    "Given the current limitations of large language models in understanding contextual nuance, how are you designing your {category} systems to handle edge cases where algorithmic outputs require human override, and what escalation frameworks have you implemented?",
    "How have you architected your data pipelines for AI-driven {category} to ensure both real-time responsiveness and compliance with evolving regulations like the EU AI Act and emerging US state-level AI employment laws?",
    "When evaluating AI vendors for {category}, what technical due diligence processes do you follow to assess model interpretability, audit trails, and the vendor's approach to training data provenance?",
    "How are you addressing the tension between personalization and standardization in AI-enabled {category}, particularly across different regulatory jurisdictions and cultural contexts within a global workforce?",
  ],

  // complexity 4-5, strategy 3 (expert + balanced)
  expertBalanced: [
    "How do you reconcile the efficiency gains of AI-driven {category} with the growing body of research suggesting that over-optimization of human capital processes can erode psychological safety and organizational trust?",
    "What frameworks are you developing to measure the second-order effects of AI-enabled {category} on organizational culture, employee agency, and the evolving social contract between employers and workers?",
    "As AI systems for {category} become more sophisticated, how should HR leaders think about the philosophical implications of algorithmic decision-making in processes that fundamentally shape people's livelihoods and career trajectories?",
    "How are you designing feedback loops between AI {category} systems and the humans they serve to ensure continuous alignment between organizational objectives and authentic employee needs?",
  ],

  // complexity 4-5, strategy 4-5 (expert + visionary)
  expertVisionary: [
    "As AI systems for {category} develop increasingly sophisticated models of human behavior and organizational dynamics, how should the HR profession evolve its ethical frameworks to govern technologies that may understand workforce patterns better than the humans designing policy?",
    "How might the convergence of AI-driven {category}, decentralized work models, and shifting generational expectations fundamentally redefine what it means to have an 'employer-employee relationship' — and what governance structures should we be building now?",
    "If AI-enabled {category} achieves the transformative potential many envision, what systemic risks to workforce equity and economic mobility should we be proactively addressing, and what role should HR leaders play in shaping that policy landscape?",
    "How do you envision the interplay between AI-driven {category} and human creativity reshaping not just how we manage talent, but how we fundamentally conceptualize the value of human contribution in an increasingly automated world?",
  ],
};

// Gen Z overlays — applied as transforms to generated questions
const genzTransforms = {
  // Level 1: No change (corporate)
  1: (q) => q,

  // Level 2: Light casual touch
  2: (q) => {
    return q
      .replace(/In your opinion, /gi, 'Real talk — ')
      .replace(/Could you share/gi, 'Would you mind sharing')
      .replace(/What is your perspective on/gi, "What's your take on")
      .replace(/fundamentally/gi, 'really')
      .replace(/\?$/, '?');
  },

  // Level 3: Moderate Gen Z energy
  3: (q) => {
    const prefixes = [
      'Okay so genuinely curious — ',
      'This might be a hot take but — ',
      "Not gonna lie, I've been thinking about this — ",
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    return prefix + q.charAt(0).toLowerCase() + q.slice(1);
  },

  // Level 4: Strong Gen Z voice
  4: (q) => {
    const prefixes = [
      'Okay this one lives rent-free in my head — ',
      'No because actually — ',
      'Not me thinking about this at 2am but — ',
      'This is giving main character energy but — ',
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let modified = q
      .replace(/very important/gi, 'lowkey crucial')
      .replace(/significant/gi, 'literally game-changing')
      .replace(/innovative/gi, 'hits different')
      .replace(/traditional/gi, 'old-school')
      .replace(/fundamentally/gi, 'deadass');
    return prefix + modified.charAt(0).toLowerCase() + modified.slice(1);
  },

  // Level 5: Maximum Gen Z — no cap
  5: (q) => {
    const prefixes = [
      'Bestie I need to know — ',
      'No cap, this keeps me up at night — ',
      'Slay or get slayed but fr fr — ',
      'Main character moment incoming — ',
      'Okay but why is nobody talking about this — ',
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let modified = q
      .replace(/important/gi, 'bussin')
      .replace(/significant/gi, 'literally iconic')
      .replace(/challenge/gi, 'struggle bus')
      .replace(/innovative/gi, 'giving renaissance energy')
      .replace(/traditional/gi, 'cheugy')
      .replace(/strategy/gi, 'game plan (no cap)')
      .replace(/transform/gi, 'glow up')
      .replace(/opportunity/gi, 'main character moment')
      .replace(/\?$/, '? Asking for a friend. ');
    return prefix + modified.charAt(0).toLowerCase() + modified.slice(1);
  },
};

function getTemplateKey(complexity, strategy) {
  const compLevel =
    complexity <= 2 ? 'simple' : complexity <= 3 ? 'moderate' : 'expert';
  const stratLevel =
    strategy <= 2 ? 'Tactical' : strategy <= 3 ? 'Balanced' : 'Visionary';
  return compLevel + stratLevel;
}

function buildQuestion(category, complexity, strategy, genz) {
  const key = getTemplateKey(complexity, strategy);
  const templates = questionTemplates[key];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const question = template.replace(/\{category\}/g, category);
  return genzTransforms[genz](question);
}
