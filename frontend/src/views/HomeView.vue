<template>
  <!-- HERO SECTION -->
  <section class="hero" id="hero">
    <div class="hero-content">
      <div class="hero-text">
        <h1>Clarity, finally.</h1>
        <p class="hero-subtitle">Join 50+ million professionals who simplify work and life with the world's #1 to-do list app.</p>
        <div class="hero-reviews">
          <span class="review-icons">&#63743; &#9679;</span>
          <span class="review-text">374K+ &#9733;&#9733;&#9733;&#9733;&#9733; reviews</span>
        </div>
        <a href="#signup" class="btn-cta">Start for free</a>
      </div>
      <div class="hero-image">
        <div class="app-mockup">
          <div class="mockup-header">
            <div class="mockup-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="mockup-title">Today</span>
          </div>
          <div class="mockup-body">
            <div class="task-item" v-for="(task, i) in mockTasks" :key="i">
              <span class="task-check" :class="{ done: task.done }"></span>
              <span class="task-text" :class="{ done: task.done }">{{ task.text }}</span>
              <span class="task-tag" :style="{ background: task.color }">{{ task.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SOCIAL PROOF -->
  <section class="social-proof" id="social-proof">
    <div class="logos-marquee">
      <div class="quote-card" v-for="(quote, i) in quotes" :key="i">
        <blockquote>"{{ quote.text }}"</blockquote>
        <cite>{{ quote.source }}</cite>
      </div>
    </div>
  </section>

  <!-- FEATURE 1: Clear your mind -->
  <section class="feature-section" id="task-management">
    <div class="feature-container">
      <div class="feature-text">
        <span class="feature-label" style="color: #DE483A;">Clear your mind</span>
        <h2>Capture tasks at the speed of thought</h2>
        <p>We've spent over a decade refining Todoist to be an extension of your mind. Capture and organize tasks instantly using easy-flowing, natural language.</p>
      </div>
      <div class="feature-visual">
        <div class="feature-card">
          <div class="card-input">
            <span class="plus-icon">+</span>
            <span class="input-text">Buy groceries tomorrow at 5pm #Personal</span>
          </div>
          <div class="card-parsed">
            <div class="parsed-item"><span class="parsed-icon">&#128197;</span> Tomorrow</div>
            <div class="parsed-item"><span class="parsed-icon">&#9201;</span> 5:00 PM</div>
            <div class="parsed-item"><span class="parsed-icon">&#128194;</span> Personal</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURE 2: Focus on what matters -->
  <section class="feature-section alt" id="project-management">
    <div class="feature-container reverse">
      <div class="feature-text">
        <span class="feature-label" style="color: #FF9933;">Focus on what matters</span>
        <h2>Organize your work and life, finally</h2>
        <p>Become focused, organized, and calm with Todoist. Prioritize your tasks, break them into manageable steps, and never miss a deadline.</p>
      </div>
      <div class="feature-visual">
        <div class="kanban-board">
          <div class="kanban-col" v-for="(col, i) in kanbanCols" :key="i">
            <h4 :style="{ color: col.color }">{{ col.title }}</h4>
            <div class="kanban-card" v-for="(card, j) in col.cards" :key="j">{{ card }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURE 3: Stay on schedule -->
  <section class="feature-section" id="time-management">
    <div class="feature-container">
      <div class="feature-text">
        <span class="feature-label" style="color: #4073FF;">Stay on schedule</span>
        <h2>Build habits that stick</h2>
        <p>Visualize your productivity trends, set recurring tasks, and build streaks that keep you motivated day after day.</p>
      </div>
      <div class="feature-visual">
        <div class="streak-card">
          <div class="streak-header">
            <span class="streak-fire">&#128293;</span>
            <span class="streak-count">14 day streak</span>
          </div>
          <div class="streak-grid">
            <div
              class="streak-day"
              v-for="(day, i) in streakDays"
              :key="i"
              :class="{ filled: day }"
            ></div>
          </div>
          <div class="streak-label">This month</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURE 4: Teamwork -->
  <section class="feature-section alt" id="teamwork">
    <div class="feature-container reverse">
      <div class="feature-text">
        <span class="feature-label" style="color: #7B68EE;">Collaborate seamlessly</span>
        <h2>Work together, achieve more</h2>
        <p>Share projects, assign tasks, and discuss details in comments. Todoist makes teamwork effortless so everyone stays aligned.</p>
      </div>
      <div class="feature-visual">
        <div class="team-avatars">
          <div class="avatar" v-for="(member, i) in teamMembers" :key="i" :style="{ background: member.color }">
            {{ member.initial }}
          </div>
          <div class="avatar add-member">+</div>
        </div>
        <div class="team-activity">
          <div class="activity-item" v-for="(act, i) in activities" :key="i">
            <div class="activity-dot" :style="{ background: act.color }"></div>
            <span>{{ act.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING SECTION -->
  <section class="pricing-section" id="pricing">
    <div class="pricing-header">
      <h2>Start for free, upgrade anytime</h2>
      <p>Choose the plan that's right for you</p>
    </div>
    <div class="pricing-cards">
      <div class="pricing-card" v-for="(plan, i) in plans" :key="i" :class="{ popular: plan.popular }">
        <div class="plan-badge" v-if="plan.popular">Most Popular</div>
        <h3>{{ plan.name }}</h3>
        <div class="plan-price">
          <span class="price">{{ plan.price }}</span>
          <span class="period" v-if="plan.period">/{{ plan.period }}</span>
        </div>
        <ul class="plan-features">
          <li v-for="(feat, j) in plan.features" :key="j">&#10003; {{ feat }}</li>
        </ul>
        <a href="#signup" class="btn-plan" :class="{ primary: plan.popular }">{{ plan.cta }}</a>
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section class="cta-section">
    <h2>Gain calmness and clarity with the world's most trusted task manager</h2>
    <div class="cta-stats">
      <div class="stat"><strong>50M+</strong><span>app downloads</span></div>
      <div class="stat"><strong>374K+</strong><span>5-star reviews</span></div>
      <div class="stat"><strong>15+</strong><span>years refining</span></div>
    </div>
    <a href="#signup" class="btn-cta large">Start for free</a>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Features</h4>
        <ul>
          <li><a href="#">How It Works</a></li>
          <li><a href="#">For Teams</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Templates</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Download Apps</a></li>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Productivity Methods</a></li>
          <li><a href="#">Integrations</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Inspiration Hub</a></li>
          <li><a href="#">Press</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <ul>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">YouTube</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Facebook</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-logo">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="5" fill="#DE483A"/>
          <path d="m6.8 15 6.4-3.7 6.6-3.8c.3-.2.3-.6 0-.8l-.2-.1c-.3-.2-.7-.4-.9-.5a1 1 0 0 0-1 0L7 12.3a1.3 1.3 0 0 1-1.3 0L0 9.1v2.7l5.4 3.1c.5.3.9.3 1.4 0Z" fill="#fff"/>
          <path d="m6.8 20.4 6.4-3.7 6.5-3.8c.3-.1.3-.6 0-.8l-.2-.1c-.3-.2-.7-.4-.9-.5a1 1 0 0 0-1 0l-10.8 6.2a1.3 1.3 0 0 1-1.4 0L0 14.5v2.7l5.4 3.1c.5.3.9.3 1.4 0Z" fill="#fff"/>
          <path d="m13.1 22.1-6.3 3.7c-.5.3-.9.3-1.4 0L0 22.7V20l5.5 3.2c.4.2.9.2 1.3 0l10.9-6.2a1 1 0 0 1 1 0l1.1.6c.3.2.3.7 0 .8l-6.6 3.8Z" fill="#fff"/>
        </svg>
        <span>todoist</span>
      </div>
      <p>&copy; Doist Inc.</p>
      <div class="footer-links">
        <a href="#">Security</a> &middot;
        <a href="#">Privacy</a> &middot;
        <a href="#">Terms</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      mockTasks: [
        { text: 'Review Q4 marketing plan', done: false, tag: 'Work', color: '#DE483A33' },
        { text: 'Buy groceries', done: false, tag: 'Personal', color: '#4073FF33' },
        { text: 'Call dentist for appointment', done: true, tag: 'Health', color: '#FF993333' },
        { text: 'Prepare team standup notes', done: false, tag: 'Work', color: '#DE483A33' },
        { text: 'Read 30 pages of book', done: true, tag: 'Learning', color: '#7B68EE33' },
      ],
      quotes: [
        { text: 'Simple, straightforward, and super powerful', source: 'The Verge' },
        { text: 'The best to-do list app on the market', source: 'PC Mag' },
        { text: 'Nothing short of stellar', source: 'TechRadar' },
      ],
      kanbanCols: [
        { title: 'To Do', color: '#DE483A', cards: ['Research competitors', 'Draft proposal'] },
        { title: 'In Progress', color: '#FF9933', cards: ['Design mockups', 'Write API docs'] },
        { title: 'Done', color: '#058527', cards: ['Setup CI/CD', 'User interviews'] },
      ],
      streakDays: [
        true, true, true, false, true, true, true,
        true, true, true, true, true, false, true,
        true, true, true, true, true, true, true,
        true, true, false, false, false, false, false,
      ],
      teamMembers: [
        { initial: 'A', color: '#DE483A' },
        { initial: 'B', color: '#4073FF' },
        { initial: 'C', color: '#FF9933' },
        { initial: 'D', color: '#7B68EE' },
      ],
      activities: [
        { text: 'Alice completed "Design review"', color: '#DE483A' },
        { text: 'Bob added a comment on "API integration"', color: '#4073FF' },
        { text: 'Carol assigned "Write tests" to Dave', color: '#FF9933' },
      ],
      plans: [
        {
          name: 'Beginner',
          price: 'Free',
          period: '',
          popular: false,
          cta: 'Get started',
          features: ['5 personal projects', 'Basic task features', '1 week activity log'],
        },
        {
          name: 'Pro',
          price: '$5',
          period: 'month',
          popular: true,
          cta: 'Start free trial',
          features: ['300 projects', 'Reminders & comments', 'Activity history', 'Themes & filters'],
        },
        {
          name: 'Business',
          price: '$8',
          period: 'user/month',
          popular: false,
          cta: 'Start free trial',
          features: ['500 projects', 'Team features', 'Admin & security', 'Priority support'],
        },
      ],
    };
  },
};
</script>
