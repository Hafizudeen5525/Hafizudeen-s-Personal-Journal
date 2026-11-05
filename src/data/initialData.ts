import { BlogData } from '../types/blog';

export const INITIAL_BLOG_DATA: BlogData = {
  profile: {
    name: 'Muhammad Hafizudeen',
    tagline: 'Quantitative Research · Mathematical Finance · Stochastic Systems',
    bio: 'Former Malaysia IMO representative and University of Michigan graduate (Actuarial Mathematics, Statistics, Data Science & Ross Business). Experienced in derivatives pricing and trading risk at PETRONAS LNG Trading, and systematic strategy research with WorldQuant (Global Top 1%). Preoccupied with the mathematical foundations of financial models and the tension between elegant theory and empirical market reality.',
    avatarUrl: '/src/assets/images/avatar_hafizudeen_male_1793872307450.jpg',
    email: 'hafizudeen991022@gmail.com',
    location: 'Kuala Lumpur · University of Michigan Alum',
    interests: [
      'Stochastic Analysis & Martingales',
      'Market Microstructure & Optimal Execution',
      'High-Frequency Time-Series & Volatility Modeling',
      'Systematic Alpha & Strategy Experimentation',
      'Mathematical Foundations of Risk & Pricing',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/muhammad-hafizudeen/',
      github: 'https://github.com/hafizudeen',
      twitter: 'https://x.com/hafizudeen',
      substack: 'https://hafizudeen.substack.com',
    },
    pinnedThoughts: [
      'What does it mean for a model to be right? The question is rarely whether a model predicts accurately, but why it succeeds in one setting and fails badly in another.',
      'Markets refuse to remain static; every new piece of information alters the state of the system, forcing models to adapt continuously while remaining mathematically coherent.',
      'An idea you cannot explain clearly to someone outside your field is an idea you do not yet understand completely yourself.',
    ],
  },
  posts: [
    {
      id: 'post-umich',
      title: "Three Angles on Uncertainty: What My Years at Michigan Taught Me",
      slug: 'three-angles-on-uncertainty-michigan',
      stream: 'Personal & Life',
      excerpt: "Reflections from Ann Arbor on pursuing Actuarial Mathematics, Statistics, Data Science, and Ross Business—and the pivotal shift from measuring static risk to modeling continuous dynamic markets.",
      publishedDate: 'November 5, 2026',
      readTime: '7 min read',
      status: 'published',
      featured: true,
      tags: ['University of Michigan', 'Actuarial Mathematics', 'Statistics', 'Data Science', 'Ross Business', 'Ann Arbor'],
      mathHighlight: '\\text{Actuarial Risk } (L_t) \\;\\perp\\; \\text{Statistical Inference } (\\hat{\\theta}) \\;\\perp\\; \\text{Stochastic Microstructure}',
      keyTakeaway: 'Mathematical elegance means little if you cannot compute it, and large-scale computation means nothing if the underlying probabilistic assumptions are flawed.',
      content: `I arrived in Ann Arbor with a perspective shaped almost entirely by Olympiad mathematics. For years, problem-solving had meant self-contained elegance: given a set of axioms and four and a half hours, there existed a deterministic path to a clean, unambiguous proof.

Yet the world outside competition mathematics is rarely self-contained, and it is almost never clean.

At the University of Michigan, I sought a broader mathematical foundation than any single discipline alone could offer. Rather than confining myself to a traditional single-track degree, I chose to pursue majors in **Actuarial Mathematics**, **Statistics**, and **Data Science**, alongside a business minor at the **Stephen M. Ross School of Business**.

Looking back, that decision was not about accumulating credentials; it was about studying uncertainty from three genuinely complementary angles.

### 1. Actuarial Science: The Architecture of Long-Term Risk

In East Hall, actuarial mathematics gave me my first formal exposure to the rigorous measurement of risk. It provided an uncompromising framework built on probability theory, compound interest, survival models, and ruin theory:

$$L_0 = \\text{PV}(\\text{Future Outflows}) - \\text{PV}(\\text{Future Inflows})$$

Actuarial models taught me the gravity of solvency—how to price liabilities that extend thirty years into an unknown future. Yet, as rigorous as it was, actuarial science treats uncertainty with a certain scheduled calm: policies mature, premiums arrive, and reserves are audited at the end of a financial period. 

I found myself drawn, increasingly and perhaps a little restlessly, to environments in which uncertainty evolves not at the end of a policy year, but continuously, second by second.

### 2. Statistics: The Skeptical Discipline of Inference

If actuarial science provided the calculus of risk, statistics provided the antidote to intellectual hubris.

In classes across West Hall and Mason Hall, statistics taught me to interrogate every assumption underneath an estimator:
- Why an unbiased estimator $\\hat{\\theta}$ can still exhibit crippling variance.
- How small violations in stationarity or normality degrade asymptotic confidence intervals into meaningless fictions.
- The delicate trade-off between bias and variance in high-dimensional parameter spaces.

Statistics instilled in me a deep, permanent skepticism of "clean" fits on historical data.

### 3. Data Science & Ross Business: Computation and Real-World Friction

Mathematics on a whiteboard can be intoxicating in its simplicity. But data science forced those abstractions to answer to algorithmic reality: profiling memory bottlenecks, vectorizing high-dimensional tensor operations, and understanding numerical stability in floating-point operations.

Meanwhile, at the Ross School of Business, discussions on capital markets, corporate strategy, and organizational decision-making grounded my technical coursework in practical human reality. I learned that even the most mathematically sophisticated model achieves very little if it cannot be communicated clearly to traders, engineers, or risk officers who must stake real capital on its output.

### The Ann Arbor Invariant

Ann Arbor in February has a way of testing your persistence. Walking across the snow-covered Diag at 7:00 AM with temperatures dropping below -15°C, notebook tucked inside a heavy parka on the way to a morning probability seminar, you learn the quiet value of showing up consistently.

Late nights in East Hall working through measure-theoretic proofs with fellow students taught me that progress in difficult fields is rarely about lone flashes of genius. It is built on persistence—the willingness to sit with an unsolved problem long after the initial excitement has faded.

Michigan gave me more than three degrees; it gave me the intellectual vocabulary to bridge rigorous abstraction with computational execution. It was the place where I realized that quantitative finance is not merely the mechanical application of known techniques, but an evolving frontier where mathematical theory and empirical evidence must answer to one another, continuously and without compromise.`,
    },
    {
      id: 'post-1',
      title: "What Does It Mean for a Model to Be Right? Notes on Mathematical Finance",
      slug: 'what-does-it-mean-for-a-model-to-be-right',
      stream: 'Math & Quants',
      excerpt: "Why the lack of a clean answer pulled me from actuarial science into mathematical finance, and the perpetual tension between elegant theory and unpredictable market reality.",
      publishedDate: 'November 4, 2026',
      readTime: '6 min read',
      status: 'published',
      featured: true,
      tags: ['Mathematical Finance', 'Stochastic Modeling', 'Epistemology', 'Market Microstructure'],
      mathHighlight: 'dS_t = \\mu(t, S_t) dt + \\sigma(t, S_t) dW_t \\quad \\text{vs.} \\quad \\text{Microstructure Friction}',
      keyTakeaway: 'The question is rarely whether a model predicts accurately, but why it succeeds in one regime and fails catastrophically in another.',
      content: `What does it mean for a model to be right? 

A strange question to ask of something as precise as mathematics, perhaps, but it is one whose lack of a clean answer is what first pulled me, deeply and rather unexpectedly, from actuarial science into the mathematics of financial markets. 

The tools felt reassuringly familiar at first—probability, optimisation, stochastic models—yet the problems they were being asked to solve were not familiar in the slightest. 

Markets, unlike the Olympiad problems that first drew me to mathematics, refuse to remain static; every new piece of information alters the state of the system, and forces the model attempting to describe it to adapt continuously while still, somehow, remaining mathematically coherent.

### The Tension Between Theory and Empirical Reality

It is this tension, between elegant theory on one hand and an unpredictable reality on the other, that I find intellectually compelling above almost everything else in mathematics.

It reaches well beyond the mere forecasting of prices, into deeper questions of:
1. **Uncertainty under Non-Stationarity**: How assumptions about distribution drift invalidate asymptotic theorems.
2. **Optimal Decision-Making**: Dynamic programming and stochastic control when execution impact alters market price.
3. **Strategic Interaction**: Game-theoretic equilibria where agents are continuously trying to outguess one another.

> "Quantitative finance is not simply the application of known methods to markets, but a field in which advances in mathematics continue, quite remarkably, to reshape our understanding of how those markets behave."

Trading decisions that look deceptively simple on the surface—placing a limit order, unwinding a delta-hedged straddle, or rebalancing an inventory—conceal underneath highly complex mathematical systems. Answering why a model breaks down requires stochastic analysis and mathematical finance studied formally, and with uncompromising mathematical rigour.`,
    },
    {
      id: 'post-2',
      title: "The Kelly Criterion in Practice: Sizing Bets Under Uncertainty & Estimation Risk",
      slug: 'kelly-criterion-in-practice',
      stream: 'Math & Quants',
      excerpt: "Why maximizing expected log wealth preserves compounding while maximizing raw arithmetic return inevitably leads to gambler's ruin.",
      publishedDate: 'October 28, 2026',
      readTime: '7 min read',
      status: 'published',
      featured: false,
      tags: ['Probability', 'Kelly Criterion', 'Portfolio Theory', 'Risk Management'],
      mathHighlight: 'f^* = \\frac{bp - q}{b} = p - \\frac{q}{b}',
      keyTakeaway: 'In multiplicative compounded systems, over-betting is fatal. Fractional Kelly (0.5x or 0.33x) protects against parameter estimation noise and fat tails.',
      content: `If you toss a biased coin that lands on heads 60% of the time, paying 1:1, how much of your capital should you allocate on each toss?

Most practitioners will either answer too conservatively (betting 1% or 2%, which barely compounds) or far too aggressively (betting 50% or 100%, which guarantees eventual ruin within a short sequence of consecutive tails).

The Kelly Criterion, formulated by J.L. Kelly Jr. in 1956 at Bell Labs, gives the mathematically optimal fraction of wealth to wager in repeated positive-expectation games:

$$f^* = \\frac{p(b+1) - 1}{b} = \\frac{bp - q}{b}$$

Where:
- $p$ is the probability of winning ($0.60$)
- $q = 1 - p$ is the probability of losing ($0.40$)
- $b$ is the odds received on the wager ($b = 1$ for even money)

Plugging in our numbers:
$$f^* = \\frac{1(0.60) - 0.40}{1} = 0.20 \\text{ (20% of capital)}$$

### Arithmetic vs. Geometric Compounding

The core reason why Kelly is counter-intuitive is the mathematical divergence between the arithmetic mean $\\mathbb{E}[X]$ and the geometric mean $G(X)$. 

If a portfolio drops by 50%, you need a 100% gain just to break even. In a multiplicative process where wealth at step $T$ is:

$$W_T = W_0 \\prod_{t=1}^{T} (1 + f R_t)$$

Maximizing expected log wealth:

$$\\max_f \\mathbb{E}[\\ln(W_T)]$$

directly maximizes the asymptotic growth rate of capital while reducing the probability of eventual ruin to zero. In practice, true edges are non-stationary, so Fractional Kelly ($0.5 f^*$) is the standard discipline to prevent ruin from parameter estimation risk.`,
    },
    {
      id: 'post-3',
      title: "From Olympiad Mathematics to Derivatives Desks: The Power of Construction",
      slug: 'from-olympiad-mathematics-to-derivatives-desks',
      stream: 'Personal & Life',
      excerpt: "How representing Malaysia at the International Mathematical Olympiad (IMO) and competing in ACM-ICPC built a mindset focused on constructing new perspectives.",
      publishedDate: 'October 18, 2026',
      readTime: '5 min read',
      status: 'published',
      featured: false,
      tags: ['IMO', 'Olympiad', 'Problem Solving', 'Michigan', 'Career'],
      keyTakeaway: 'The most rewarding problems are usually those without an obvious method of solution, where progress depends on constructing an entirely new perspective.',
      content: `Competitive mathematics taught me, first and above all else, to appreciate abstraction and precise reasoning long before I ever encountered a derivatives desk.

Representing Malaysia at the International Mathematical Olympiad (IMO), and later competing in the ACM International Collegiate Programming Contest, developed in me an approach to problem-solving built on logical rigour, creativity and, perhaps most usefully, persistence.

In Olympiad contests, you are given four and a half hours for three problems. You cannot rely on rote algorithmic execution; progress depends entirely on finding an invariant, constructing an auxiliary polynomial, or shifting coordinates into a space where the problem's symmetry reveals itself.

### The Michigan Journey: Complementary Angles on Uncertainty

At the University of Michigan, I sought a broader mathematical foundation than any one discipline alone could offer. I pursued majors in **Actuarial Mathematics**, **Statistics**, and **Data Science**, alongside a business minor at the **Ross School of Business**.

Together these disciplines allowed me to study uncertainty from genuinely complementary angles:
- **Actuarial Mathematics**: Probability, longevity models, and stochastic processes.
- **Statistics**: Rigorous inference, hypothesis formulation, and variance reduction.
- **Data Science**: Large-scale numerical computation and algorithmic optimization.

While actuarial science gave me a solid framework for measuring long-term financial risk, I found myself drawn, increasingly and restlessly, to dynamic environments where uncertainty evolves continuously and a model must respond to new information in real time rather than at the end of a policy year.`,
    },
    {
      id: 'post-4',
      title: "Trading Risk on a Multi-Billion-Dollar Energy Portfolio: Lessons from PETRONAS LNG",
      slug: 'trading-risk-multi-billion-dollar-energy-portfolio',
      stream: 'Achievements',
      excerpt: "Pricing complex derivatives, building quantitative risk frameworks, and confronting the practical limitations of textbook assumptions in commodities.",
      publishedDate: 'October 02, 2026',
      readTime: '6 min read',
      status: 'published',
      featured: false,
      tags: ['Commodities', 'Derivatives Pricing', 'PETRONAS', 'Risk Management', 'LNG'],
      keyTakeaway: 'Working alongside traders reveals just how much a model’s performance depends on implicit assumptions one rarely thinks to question.',
      content: `At PETRONAS, my journey spanned two deeply complementary roles: first as a Data Scientist building predictive models for high-frequency industrial time-series data, and subsequently in the LNG Trading division as a Trading Risk Analyst.

Working in the LNG Trading division meant pricing complex derivatives and building quantitative risk models for a multi-billion-dollar physical and financial energy portfolio.

### The Realities of Physical Commodity Markets

Commodity markets differ sharply from equity markets:
1. **Physical Logistics & Delivery Bottlenecks**: Liquidity is not infinite; vessels, terminal slots, and boil-off rates introduce hard operational constraints into the payoff surface.
2. **Volatility Skews & Seasonality**: Jump-diffusion processes and mean-reverting stochastic volatility are not academic curiosities—they are the baseline reality.
3. **Implicit Model Assumptions**: A pricing model that works well in calm spot regimes can break severely during sudden European gas benchmark supply shocks.

Working alongside traders on the desk day-to-day exposed me properly to the practical limitations of mathematical models. It reinforced the conviction that an idea you cannot explain clearly to someone outside your field is an idea you do not yet understand completely yourself.`,
    },
    {
      id: 'post-5',
      title: "Notes on Claude Shannon's Demon: Volatility Pumping & Rebalancing Drift",
      slug: 'notes-on-claude-shannons-demon',
      stream: 'Math & Quants',
      excerpt: "How rebalancing between cash and an asset with zero net geometric drift produces guaranteed positive capital growth through volatility pumping.",
      publishedDate: 'September 22, 2026',
      readTime: '5 min read',
      status: 'published',
      featured: false,
      tags: ['Information Theory', 'Claude Shannon', 'Volatility Pumping', 'Rebalancing'],
      mathHighlight: 'g = \\frac{1}{2} \\ln(1.125) \\approx +0.0588 \\text{ per cycle}',
      keyTakeaway: 'Regular rebalancing acts as an entropy pump that harvests uncorrelated variance into geometric drift.',
      content: `In the 1960s at MIT, Claude Shannon—the founder of Information Theory—formulated a brilliant thought experiment showing that rebalancing between cash and an asset with zero net drift produces a guaranteed positive rate of return.

Suppose an asset either doubles ($+100\\%$) or halves ($-50\\%$) with equal probability each period.

If you buy and hold $100:
- Cycle 1: Doubles to $200.
- Cycle 2: Halves back to $100.
- Geometric compound return: $\\sqrt{2 \\times 0.5} = 1.00$ ($0\\%$ net growth).

### Shannon's Rebalancing Algorithm

Now consider holding 50% in cash ($50) and 50% in the asset ($50), rebalancing back to 50/50 after each turn:
- **If it doubles**: Asset goes to $100. Portfolio = $50 cash + $100 asset = $150. Rebalance to $75 cash and $75 asset.
- **If it halves**: The $75 asset falls to $37.50. Portfolio = $75 cash + $37.50 asset = **$112.50**.

After one win and one loss, you have gained **+12.5%**! 

The mechanical rebalancing operation systematically sells overvalued asset units and injects cash into undervalued units, turning pure variance into positive compounded drift.`,
    },
  ],
  readingShelf: [
    {
      id: 'book-1',
      title: 'Stochastic Calculus for Finance II: Continuous-Time Models',
      author: 'Steven Shreve',
      type: 'Book',
      url: 'https://link.springer.com/book/10.1007/978-0-387-22527-2',
      status: 'Recommended',
      notes: 'The gold standard for measure-theoretic probability, Brownian motion, Girsanov theorem, and Martingale Representation Theorem.',
      rating: 5,
      dateAdded: 'Oct 2026',
      streamCategory: 'Math & Quants',
    },
    {
      id: 'paper-1',
      title: 'Optimal Execution of Portfolio Transactions',
      author: 'Robert Almgren & Neil Chriss',
      type: 'Paper',
      url: 'https://www.math.nyu.edu/~almgren/papers/optliq.pdf',
      status: 'Read',
      notes: 'The seminal framework formulating optimal trade scheduling as an Euler-Lagrange calculus of variations problem under temporary and permanent market impact.',
      rating: 5,
      dateAdded: 'Sep 2026',
      streamCategory: 'Math & Quants',
    },
    {
      id: 'book-2',
      title: 'Market Microstructure Theory',
      author: 'Maureen O\'Hara',
      type: 'Book',
      url: 'https://www.wiley.com',
      status: 'Recommended',
      notes: 'Foundational text on how inventory constraints, bid-ask spreads, and asymmetric information determine prices at high frequency.',
      rating: 5,
      dateAdded: 'Aug 2026',
      streamCategory: 'Math & Quants',
    },
    {
      id: 'paper-2',
      title: 'A Mathematical Theory of Communication',
      author: 'Claude E. Shannon (1948)',
      type: 'Paper',
      url: 'https://ieeexplore.ieee.org/document/6773024',
      status: 'Read',
      notes: 'Foundational paper on information entropy, channel capacity, and signal extraction from noise.',
      rating: 5,
      dateAdded: 'Jul 2026',
      streamCategory: 'Math & Quants',
    },
  ],
  milestones: [
    {
      id: 'm-1',
      year: '2026',
      title: 'WorldQuant International Quant Championship — Global Top 1%',
      category: 'Quant & Code',
      description: 'Developed systematic alpha investment hypotheses, backtesting automated tooling, and market signals on the WorldQuant BRAIN research platform.',
      metrics: 'Advanced to Global Top 1% among thousands of international quantitative researchers',
    },
    {
      id: 'm-2',
      year: '2024–2025',
      title: 'Trading Risk Analyst (LNG Trading Division) at PETRONAS',
      category: 'Career',
      description: 'Priced complex multi-commodity derivatives, engineered quantitative risk models, and analyzed stress tests for a multi-billion-dollar global energy trading portfolio.',
      metrics: 'Daily derivatives risk monitoring & desk interaction',
    },
    {
      id: 'm-3',
      year: '2023–2024',
      title: 'Data Scientist at PETRONAS',
      category: 'Career',
      description: 'Built predictive machine learning models and signal extraction pipelines for high-frequency industrial time-series data.',
      metrics: 'Extracted meaningful signal from high-noise telemetry',
    },
    {
      id: 'm-4',
      year: '2019–2023',
      title: 'University of Michigan (Triple Major)',
      category: 'Academic',
      description: 'Pursued Actuarial Mathematics, Statistics, and Data Science majors with a minor in Business at the Stephen M. Ross School of Business.',
      metrics: 'Complementary foundations in probability, inference, and computation',
    },
    {
      id: 'm-5',
      year: 'Olympiad',
      title: 'Represented Malaysia at the International Mathematical Olympiad (IMO)',
      category: 'Academic',
      description: 'Competed at the highest international level in Olympiad mathematics, cultivating rigorous proof construction, combinatorics, and number theory.',
      metrics: 'ACM-ICPC competitor & national mathematics honor',
    },
  ],
  messages: [
    {
      id: 'msg-1',
      name: 'Dr. Arthur Pendelton',
      email: 'a.pendelton@oxford-mcf.ac.uk',
      subject: 'Inquiry on Stochastic Modeling & Microstructure Research',
      message: 'Hello Hafizudeen, I read your formulation on market impact and parameter estimation in non-stationary regimes. Your background bridging IMO mathematics, Michigan actuarial science, and LNG trading risk is exceptional.',
      date: 'Nov 3, 2026',
      read: false,
    },
  ],
};
