import { BlogData } from '../types/blog';

export const INITIAL_BLOG_DATA: BlogData = {
  profile: {
    name: 'Hafizudeen Saman',
    tagline: 'Quantitative Research · Mathematical Finance · Stochastic Systems',
    bio: 'University of Michigan alum (Triple Major in Actuarial Mathematics, Statistics, Data Science & Ross Business Minor; Summa Cum Laude & CIGNA Award recipient). UMTKD Collegiate Taekwondo athlete (National Bronze, Princeton Gold). Experienced in actuarial valuation at Aon, derivatives pricing & LNG trading risk at PETRONAS, and systematic strategy research with WorldQuant (Global Top 1%).',
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
      'Discipline on the mat and rigour on the whiteboard feed into one another: in competition as in mathematics, technique without poise breaks under pressure.',
    ],
  },
  posts: [
    {
      id: 'post-umich',
      title: "The Michigan Chronicle: Quad Architecture, Triple Major Grinds, UMTKD, and Winter on the Diag",
      slug: 'the-michigan-chronicle-ann-arbor-experience',
      stream: 'Personal & Life',
      excerpt: "From the quiet sanctuary of the Law Library and freezing 7 AM walks across the Diag, to UMTKD medals, an actuarial internship at Aon, COVID-era pivots, and receiving the CIGNA Award at graduation.",
      publishedDate: 'November 5, 2026',
      readTime: '8 min read',
      status: 'published',
      featured: true,
      tags: ['University of Michigan', 'LSA', 'UMTKD', 'Ann Arbor', 'Actuarial Math', 'Ross Business', 'Aon Internship'],
      coverImage: '/src/assets/images/michigan_law_quad_library_1793896226792.jpg',
      coverImageCaption: 'Evening amber light glowing through the Collegiate Gothic arches of the Law Quadrangle in Ann Arbor.',
      gallery: [
        {
          url: '/src/assets/images/michigan_law_quad_library_1793896226792.jpg',
          caption: 'The Law Library & Quadrangle: Quiet sanctuary of oak desks and leaded glass windows.',
          alt: 'University of Michigan Law Quadrangle in Ann Arbor'
        },
        {
          url: '/src/assets/images/collegiate_taekwondo_action_1793896226459.jpg',
          caption: 'UMTKD in tournament mode: Bronze at Collegiate Nationals and Gold at Princeton NCTA.',
          alt: 'University of Michigan Taekwondo Team tournament sparring match'
        },
        {
          url: '/src/assets/images/ann_arbor_winter_diag_1793896227634.jpg',
          caption: 'Snow on the Central Campus Diag: 7:00 AM sub-zero morning walks to East Hall.',
          alt: 'University of Michigan Central Campus Diag covered in snow'
        },
        {
          url: '/src/assets/images/michigan_graduation_commencement_1793896227030.jpg',
          caption: 'Commencement day: Maize and blue cords, receiving the CIGNA Award and Summa Cum Laude.',
          alt: 'University of Michigan Commencement regalia and honors diploma'
        }
      ],
      mathHighlight: '\\text{Actuarial Science } (L_t) \\;\\perp\\; \\text{Statistics } (\\hat{\\theta}) \\;\\perp\\; \\text{Data Science } (\\mathcal{O}(N))',
      keyTakeaway: 'The authentic Michigan experience was not merely three degrees on a diploma; it was learning how to adapt under severe friction—whether making weight for nationals, proving measure theory in sub-zero snow, or executing remote actuarial reserves during a global pandemic.',
      content: `Anyone who has spent a winter in Ann Arbor knows the quiet, startling beauty of the Central Campus Diag at seven in the morning. When the temperature drops below -15°C, the cold cuts through your coat before you even reach the steps of Hatcher Graduate Library, and the brick pathways are dusted with fresh Michigan powder. 

Yet walking those snow-blanketed paths between Mason Hall and East Hall was where my university years truly took shape. Coming to Michigan wasn't just about collecting coursework; it was about immersing myself in the expansive, demanding culture of the College of Literature, Science, and the Arts (LSA) and discovering the rhythm of a university that expects uncompromising discipline from you in every arena.

### The Architecture & The Sanctuary of the Law Library

When problem sets in measure-theoretic probability or high-dimensional multivariate statistics became overwhelming, the antidote was always the architecture of Ann Arbor.

The Collegiate Gothic stonework of the **Law Quadrangle** remains etched into my memory. Walking beneath the stone arches into the Law Quad feels like stepping outside of time. In the reading room, under the soaring timbered ceilings and warm amber chandeliers, the silence is physical. You hear only the turning of heavy pages and the scratching of fountain pens on notebooks. It was here, at long oak study desks alongside stacks of legal treatises, that I spent hundreds of hours reading through stochastic calculus texts, working through measure-theoretic proofs, and dissecting statistical journals. The sheer serenity of that space taught me how to sit with intellectual difficulty without rushing to an easy conclusion.

### The LSA Life & The Triple Major Workload

Being an LSA student offered an intellectual freedom that few institutions match, but pairing three quantitative majors—**Actuarial Mathematics**, **Statistics**, and **Data Science**—alongside a business minor at the **Stephen M. Ross School of Business** demanded an almost military level of calendar governance.

A typical Tuesday might start in East Hall with actuarial survival models and reserve calculations, transition to West Hall for mathematical statistics and likelihood inference, move across North University Avenue to the modern computer labs for large-scale algorithmic optimization in Python and C++, and conclude at the Ross School of Business debating corporate capital allocation and trading strategies. 

Each department demanded a different posture:
- **Actuarial Mathematics (East Hall)**: Grounded in solvency, mortality projections, and solvency regulation.
- **Statistics (West Hall)**: The skeptical art of questioning whether the signal you think you found is merely sample variance.
- **Data Science**: Algorithmic friction—vectorization, memory bounds, and numerical stability.
- **Ross School of Business**: Translating complex quantitative machinery into executive clarity.

### Mat and Mind: UMTKD (Michigan Taekwondo)

To survive a triple major with your mind intact, you need a physical anchor. For me, that anchor was **UMTKD (University of Michigan Taekwondo)**.

Stepping into the training room at the CCRB after ten straight hours of coding and lemmas was transformative. On the mat, abstract equations disappear. All that remains is timing, distance, footwork, and decisive execution. Taekwondo requires an immediate honesty that mathematics rarely imposes in real time: if your reaction is a fraction of a second late or your distance is poorly judged, you pay for it instantly.

Representing the University of Michigan across the collegiate circuit was one of the proudest chapters of my life:
- **Collegiate Nationals**: Fighting through intense bracket rounds to secure the **Bronze Medal for Michigan**.
- **Princeton University (NCTA)**: Competing in New Jersey against top Ivy League and national martial artists, leaving everything on the mat, and capturing the **Gold Medal at Princeton**.

The discipline built cutting weight, sparring through fatigue, and defending the Block M jersey translated directly back into academic persistence. In competition as in research, technique without composure breaks under pressure.

### The Industry Crucible: Actuarial Internship at Aon

During my university career, I also took my academic preparation into the commercial trenches through an actuarial consulting internship at **Aon**. 

Working at Aon demystified textbook finance. I was tasked with analyzing pension liabilities, running complex valuation models, and evaluating the sensitivity of multi-million-dollar portfolios to interest rate shifts and mortality assumptions. At Aon, I saw firsthand that actuarial work is not just an academic exercise—it is the financial bedrock that ensures retirees receive their livelihood. It provided me with a deep respect for governance and risk measurement, while subtly planting the seed that would later pull me into the continuous-time world of trading desks and liquid commodities.

### Adapting Through the COVID Disruption

In the spring of 2020, our world fractured. Ann Arbor abruptly emptied. The bustling lecture halls of Mason Hall, the packed tables of Shapiro Library, and our daily training sessions in the dojang suddenly vanished behind computer screens as the COVID-19 pandemic swept across the globe.

Adapting to remote learning across completely mismatched time zones, maintaining physical training in isolation with resistance bands and kicking pads in a cramped apartment, and collaborating on high-dimensional data science group projects via Zoom required immense mental fortitude. It tested whether our motivation was reliant on external academic momentum or rooted internally. The pandemic forced us to become resilient, self-directed problem-solvers who could deliver rigorous results regardless of physical chaos.

### Commencement: The CIGNA Award and Summa Cum Laude

When graduation finally arrived, standing in the sea of maize and blue with my parents and peers felt like the culmination of every sub-zero morning walk and every midnight proof in East Hall.

Walking across the stage, receiving my honors cords, and being awarded the **CIGNA Award for Actuarial Excellence** alongside graduating **Summa Cum Laude** was profoundly humbling. The CIGNA Award recognized dedication to the actuarial sciences, while Summa Cum Laude reflected maintaining the highest academic standing across all three demanding majors.

Yet as I looked across campus one last time, what stayed with me was not the plaque or the awards. It was the memory of Ann Arbor itself: the golden leaves of the Law Quad in October, the steam rising from a cup of coffee on the frozen Diag in January, the camaraderie of training with UMTKD teammates, and the quiet confidence that whatever complex mathematical or financial challenge lies ahead, Michigan taught us how to face it with clarity and grit.`,
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
      year: '2023',
      title: 'Graduated Summa Cum Laude & Awarded CIGNA Award for Actuarial Excellence',
      category: 'Academic',
      description: 'Completed Triple Major in Actuarial Mathematics, Statistics, and Data Science with Ross Business Minor from the University of Michigan, receiving the CIGNA Award for Actuarial Excellence.',
      metrics: 'Summa Cum Laude honors & CIGNA Actuarial Award',
    },
    {
      id: 'm-4',
      year: '2022',
      title: 'UMTKD Collegiate Taekwondo — National Bronze & Princeton Gold',
      category: 'Personal',
      description: 'Represented the University of Michigan Taekwondo Team (UMTKD) across collegiate circuits, securing Bronze at National Collegiate Taekwondo Championships and Gold at Princeton University NCTA.',
      metrics: 'Collegiate Nationals Bronze · Princeton University Gold',
    },
    {
      id: 'm-5',
      year: '2022',
      title: 'Actuarial Consulting Intern at Aon',
      category: 'Career',
      description: 'Conducted liability valuation modeling, pension asset-liability matching, and interest rate sensitivity analysis for institutional portfolios.',
      metrics: 'Multi-million-dollar pension valuation analysis',
    },
    {
      id: 'm-6',
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
