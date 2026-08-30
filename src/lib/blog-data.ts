export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  createdAt: string;
  featured: boolean;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Discipline Blueprint: How to Build Unbreakable Habits",
    slug: "discipline-blueprint-unbreakable-habits",
    excerpt:
      "Discipline isn't about motivation — it's about systems. Learn the framework that separates those who dream from those who execute.",
    content: `Discipline is the bridge between goals and accomplishment. At ASCEND, we believe that discipline is not something you're born with — it's something you build, one decision at a time.

## The 4 Pillars of Discipline

### 1. Clarity of Purpose
You can't be disciplined about something you don't truly care about. Before you build systems, you need to know WHY you're building them. Write down your goals. Make them specific. Make them uncomfortable.

### 2. Environment Design
The people around you shape who you become. Surround yourself with those who grind, who push, who refuse to settle. Your environment should make discipline the default, not the exception.

### 3. Identity-Based Habits
Don't just say "I want to work out." Say "I am someone who trains." When your habits align with your identity, discipline becomes effortless because you're simply being who you are.

### 4. Embrace the Discomfort
Growth happens outside your comfort zone. Every time you choose the hard path, you're casting a vote for the person you want to become.

## The ASCEND Mindset

At ASCEND, we don't just make clothing — we make statements. Every piece you wear is a reminder of the discipline it took to earn it. This isn't just fabric; it's armor for the self-made.

The blueprint is simple: Choose discipline. Build systems. Embrace pressure. ASCEND.`,
    category: "Discipline",
    author: "ASCEND Team",
    readTime: "5 min read",
    createdAt: "2025-01-15",
    featured: true,
  },
  {
    id: "2",
    title: "Streetwear Culture: From Underground to Mainstream",
    slug: "streetwear-culture-underground-mainstream",
    excerpt:
      "How streetwear evolved from skate parks to luxury runways — and why brands like ASCEND are bringing it back to its roots.",
    content: `Streetwear was never about luxury. It was about expression. Born in the streets of New York, Tokyo, and London, streetwear was the uniform of those who refused to conform.

## The Evolution

### The 1980s-90s: Raw Roots
Shawn Stussy, Supreme, Stüssy — these brands didn't follow trends. They created them. T-shirts became canvases. Sneakers became culture.

### The 2000s: Corporate Interest
Brands like Nike and Adidas noticed the power of streetwear. Collaborations blurred the lines between athletic wear and fashion.

### The 2020s: Premium Evolution
Today, streetwear has evolved. It's premium. It's intentional. It's not just what you wear — it's what you stand for.

## The ASCEND Difference

ASCEND represents the next evolution. We merge the raw energy of underground streetwear with premium quality and a message that matters: Rise above. Every piece is forged with purpose — for those who grind, who push, who refuse to stay average.

Streetwear isn't dead. It's ascended.`,
    category: "Streetwear",
    author: "ASCEND Team",
    readTime: "4 min read",
    createdAt: "2025-01-20",
    featured: true,
  },
  {
    id: "3",
    title: "5 AM Club: Why Early Mornings Change Everything",
    slug: "5am-club-early-mornings-change-everything",
    excerpt:
      "The first hours of your day determine the trajectory of your life. Here's why the world's most successful people wake up before dawn.",
    content: `There's something powerful about the world before it wakes up. No distractions. No notifications. Just you and your potential.

## The Science of Early Mornings

### Cortisol Awakening Response
Your body naturally produces cortisol in the early morning, giving you a natural boost of energy and focus. Use it.

### Decision Fatigue
By waking up early, you make your most important decisions before the world starts demanding your attention.

## Building Your Morning Routine

### 1. No Phone for the First Hour
Your morning shouldn't start with other people's agendas. Protect your first hour like your life depends on it — because your growth does.

### 2. Move Your Body
Whether it's a run, a lift, or stretching — physical movement primes your mind for the day ahead.

### 3. Plan Your Day
Spend 10 minutes writing your top 3 priorities. Not a to-do list — a mission list.

### 4. Feed Your Mind
Read, listen to a podcast, or journal. Feed your mind with intention, not with noise.

## The ASCEND Connection

We design our gear for the 5 AM warriors. The ones who are already grinding while the world sleeps. Your wardrobe should match your ambition.

Rise early. Grind hard. ASCEND.`,
    category: "Motivation",
    author: "ASCEND Team",
    readTime: "6 min read",
    createdAt: "2025-01-25",
    featured: false,
  },
  {
    id: "4",
    title: "The Complete Guide to Building a Premium Wardrobe",
    slug: "complete-guide-building-premium-wardrobe",
    excerpt:
      "Quality over quantity. Learn how to build a wardrobe that looks expensive, feels incredible, and lasts for years.",
    content: `A premium wardrobe isn't about having the most clothes — it's about having the right clothes. Every piece should be intentional, versatile, and built to last.

## The Foundation: Quality Basics

### 1. The Perfect Tee
Start with heavyweight cotton (200+ GSM). A well-made tee is the foundation of any premium outfit. Look for pre-shrunk, reinforced seams, and a relaxed fit.

### 2. The Statement Hoodie
Your hoodie should feel like a cloud and look like armor. Triple-layer fleece, brushed interior, and oversized construction are non-negotiable.

### 3. Technical Joggers
Performance meets style. Look for tapered fits, quality zippers, and fabrics that move with you.

## The ASCEND Approach

Every ASCEND piece is designed with the premium wardrobe in mind. We don't make fast fashion — we make forever pieces. Each garment is:

- Made from 220+ GSM heavyweight cotton
- Pre-shrunk for consistent sizing
- Constructed with reinforced seams
- Designed for oversized, modern fits
- Built to survive hundreds of washes

Invest in quality. Your wardrobe — and your confidence — will thank you.`,
    category: "Streetwear",
    author: "ASCEND Team",
    readTime: "5 min read",
    createdAt: "2025-02-01",
    featured: false,
  },
  {
    id: "5",
    title: "Mental Fitness: Training Your Mind Like a Muscle",
    slug: "mental-fitness-training-mind-muscle",
    excerpt:
      "Physical strength means nothing without mental resilience. Here's how to train your mind for peak performance.",
    content: `Your body can only go where your mind leads it. Mental fitness isn't optional — it's the foundation of everything you want to achieve.

## Why Mental Fitness Matters

### The Performance Gap
The difference between good and great isn't talent — it's mental toughness. When the body says quit, the mind must say continue.

### Resilience Under Pressure
Life will throw obstacles at you. Your ability to stay calm, focused, and determined under pressure determines your success.

## Training Your Mind

### 1. Cold Exposure
Cold showers, ice baths, or even just cold water on your face. Training yourself to embrace discomfort builds mental calluses.

### 2. Meditation
Just 10 minutes a day of focused breathing can dramatically improve your focus, reduce stress, and increase emotional regulation.

### 3. Challenge Yourself Daily
Do one thing every day that makes you uncomfortable. Public speaking, a hard workout, a difficult conversation. Growth lives on the other side of fear.

### 4. Journaling
Write down your thoughts, your goals, your wins, and your losses. Reflection is where self-awareness is born.

## The ASCEND Lifestyle

At ASCEND, mental fitness is part of our DNA. Our clothing is designed for those who train their minds as hard as their bodies. Every piece carries the spirit of resilience, discipline, and relentless self-improvement.

Forge your mind. Forge your future. ASCEND.`,
    category: "Fitness",
    author: "ASCEND Team",
    readTime: "6 min read",
    createdAt: "2025-02-05",
    featured: true,
  },
  {
    id: "6",
    title: "How to Stay Consistent When Motivation Fades",
    slug: "stay-consistent-motivation-fades",
    excerpt:
      "Motivation is temporary. Systems are forever. Learn how to build consistency that lasts long after the initial excitement fades.",
    content: `Here's the truth: motivation comes and goes. What separates those who achieve their goals from those who don't isn't motivation — it's consistency.

## Why Motivation Fails

Motivation is an emotion. And like all emotions, it fluctuates. You can't build a life on something that's unreliable.

## The Consistency Framework

### 1. Start Ridiculously Small
Don't aim for perfection — aim for repetition. A 10-minute workout every day beats a 2-hour session once a week.

### 2. Track Everything
What gets measured gets managed. Use a habit tracker, a journal, or even a simple calendar. The visual progress keeps you going.

### 3. Build Identity
Don't say "I'm trying to work out." Say "I'm someone who trains." Identity-based habits are more resilient than outcome-based habits.

### 4. Forgive, Don't Stop
Missed a day? That's okay. Missed a week? Still okay. What matters is that you start again. Never let a bad day become a bad week.

## The ASCEND Promise

Every ASCEND piece you wear is a physical reminder of your commitment to consistency. When you put on your PRESSURE Hoodie, remember: this is armor for the person who doesn't stop.

Consistency is the ultimate flex. Stay consistent. ASCEND.`,
    category: "Motivation",
    author: "ASCEND Team",
    readTime: "4 min read",
    createdAt: "2025-02-10",
    featured: false,
  },
  {
    id: "7",
    title: "The Art of Recovery: Why Rest Days Make You Stronger",
    slug: "art-of-recovery-rest-days-stronger",
    excerpt:
      "You don't grow in the gym — you grow when you rest. Understanding recovery is the key to long-term fitness success.",
    content: `Every elite athlete knows a secret that amateurs ignore: rest is where growth happens. Training breaks your muscles down. Recovery builds them back up, stronger than before.

## The Science of Recovery

### Muscle Repair
During rest, your body repairs micro-tears in muscle fibers, making them larger and stronger. Without adequate rest, you're just breaking yourself down.

### Hormonal Balance
Overtraining disrupts your cortisol and testosterone levels. Proper rest keeps your hormones optimized for growth.

## Recovery Strategies

### 1. Sleep (7-9 Hours)
Non-negotiable. Sleep is when your body releases growth hormone. Make your bedroom a recovery sanctuary.

### 2. Active Recovery
Light walking, stretching, yoga — keep the blood flowing without adding stress to your body.

### 3. Nutrition
Your post-workout meal matters. Protein for muscle repair, carbs for glycogen replenishment, and healthy fats for hormone production.

### 4. Mental Recovery
Take breaks from screens. Spend time in nature. Meditate. Your brain needs recovery too.

## The ASCEND Recovery Kit

Recovery is part of the ASCEND lifestyle. Our comfortable, oversized pieces are designed for those rest days when you're recovering, refueling, and preparing for the next session.

Look premium even when you're resting. ASCEND.`,
    category: "Fitness",
    author: "ASCEND Team",
    readTime: "5 min read",
    createdAt: "2025-02-15",
    featured: false,
  },
  {
    id: "8",
    title: "Building Your Personal Brand in 2025",
    slug: "building-personal-brand-2025",
    excerpt:
      "In a world of noise, your personal brand is your signal. Here's how to build one that's authentic, powerful, and unmistakably yours.",
    content: `Everyone has a personal brand. The question is whether you're controlling it or letting the internet decide for you.

## What is a Personal Brand?

It's not your logo or your aesthetic. It's what people say about you when you're not in the room. It's the intersection of your skills, your values, and your story.

## Building Blocks

### 1. Define Your Values
What do you stand for? What will you never compromise on? Your values are the foundation of your brand.

### 2. Tell Your Story
People connect with stories, not sales pitches. Share your journey — the wins, the losses, and everything in between.

### 3. Show Up Consistently
Post regularly. Engage with your community. Be present. Consistency builds trust.

### 4. Dress the Part
Your appearance is the first signal people receive. Premium clothing isn't vanity — it's strategy. When you look premium, you signal that you take yourself seriously.

## The ASCEND Connection

ASCEND isn't just clothing — it's a brand statement. When you wear ASCEND, you're telling the world: I am disciplined. I am ambitious. I am forging my own path.

Your personal brand starts with how you present yourself to the world. ASCEND above the noise.`,
    category: "Lifestyle",
    author: "ASCEND Team",
    readTime: "5 min read",
    createdAt: "2025-02-20",
    featured: false,
  },
];

export const blogCategories = [
  "All",
  "Motivation",
  "Fitness",
  "Discipline",
  "Streetwear",
  "Lifestyle",
];
