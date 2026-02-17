<template>
  <div class="todoist-page">
    <!-- NAVBAR with Scroll Progress Animation -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="navbar-inner">
        <div class="navbar-logo">
          <div class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="5" fill="#DE483A"/>
              <path d="m6.8 15 6.4-3.7 6.6-3.8c.3-.2.3-.6 0-.8l-.2-.1c-.3-.2-.7-.4-.9-.5a1 1 0 0 0-1 0L7 12.3a1.3 1.3 0 0 1-1.3 0L0 9.1v2.7l5.4 3.1c.5.3.9.3 1.4 0Z" fill="#fff"/>
              <path d="m6.8 20.4 6.4-3.7 6.5-3.8c.3-.1.3-.6 0-.8l-.2-.1c-.3-.2-.7-.4-.9-.5a1 1 0 0 0-1 0l-10.8 6.2a1.3 1.3 0 0 1-1.4 0L0 14.5v2.7l5.4 3.1c.5.3.9.3 1.4 0Z" fill="#fff"/>
              <path d="m13.1 22.1-6.3 3.7c-.5.3-.9.3-1.4 0L0 22.7V20l5.5 3.2c.4.2.9.2 1.3 0l10.9-6.2a1 1 0 0 1 1 0l1.1.6c.3.2.3.7 0 .8l-6.6 3.8Z" fill="#fff"/>
            </svg>
          </div>
          <span class="logo-text">todoist</span>
        </div>
        <ul class="navbar-links">
          <li class="nav-item has-dropdown">
            <button @click="toggleDropdown('madeFor')">Made For <span class="chevron">&#9662;</span></button>
            <ul class="dropdown" v-show="activeDropdown === 'madeFor'">
              <li><a href="#task-management">Task Management</a></li>
              <li><a href="#project-management">Project Management</a></li>
              <li><a href="#time-management">Time Management</a></li>
              <li><a href="#habit-forming">Habit Forming</a></li>
              <li><a href="#teamwork">Teamwork</a></li>
            </ul>
          </li>
          <li class="nav-item has-dropdown">
            <button @click="toggleDropdown('resources')">Resources <span class="chevron">&#9662;</span></button>
            <ul class="dropdown" v-show="activeDropdown === 'resources'">
              <li><a href="#integrations">Integrations</a></li>
              <li><a href="#templates">Templates</a></li>
              <li><a href="#getting-started">Getting Started</a></li>
              <li><a href="#help-center">Help Center</a></li>
              <li><a href="#customers">Customer Stories</a></li>
              <li><a href="#productivity">Productivity Methods + Quiz</a></li>
              <li><a href="#inspiration">Inspiration Hub</a></li>
              <li><a href="#downloads">Downloads</a></li>
            </ul>
          </li>
          <li class="nav-item"><a href="#pricing">Pricing</a></li>
        </ul>
        <div class="navbar-actions">
          <a href="#login" class="btn-login">Log in</a>
          <a href="#signup" class="btn-signup">Start for free</a>
        </div>
        <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
      <!-- Scroll Progress Bar -->
      <div class="scroll-progress">
        <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
      </div>
      <!-- Section indicators in navbar -->
      <div class="section-nav" v-show="isScrolled">
        <div class="section-nav-inner">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="'#' + section.id"
            class="section-dot"
            :class="{ active: currentSection === section.id }"
            @click.prevent="scrollToSection(section.id)"
          >
            <span class="dot"></span>
            <span class="section-label">{{ section.label }}</span>
          </a>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: mobileMenuOpen }">
      <ul>
        <li><a href="#task-management" @click="mobileMenuOpen = false">Task Management</a></li>
        <li><a href="#project-management" @click="mobileMenuOpen = false">Project Management</a></li>
        <li><a href="#pricing" @click="mobileMenuOpen = false">Pricing</a></li>
        <li><a href="#login" @click="mobileMenuOpen = false">Log in</a></li>
        <li><a href="#signup" class="btn-signup" @click="mobileMenuOpen = false">Start for free</a></li>
      </ul>
    </div>

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
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      scrollProgress: 0,
      isScrolled: false,
      currentSection: 'hero',
      activeDropdown: null,
      mobileMenuOpen: false,
      sections: [
        { id: 'hero', label: 'Home' },
        { id: 'task-management', label: 'Tasks' },
        { id: 'project-management', label: 'Projects' },
        { id: 'time-management', label: 'Habits' },
        { id: 'teamwork', label: 'Teams' },
        { id: 'pricing', label: 'Pricing' },
      ],
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
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('click', this.closeDropdowns);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('click', this.closeDropdowns);
  },
  methods: {
    onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      this.isScrolled = scrollTop > 60;

      // Determine current section
      const sectionIds = this.sections.map(s => s.id);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          this.currentSection = sectionIds[i];
          break;
        }
      }
    },
    toggleDropdown(name) {
      this.activeDropdown = this.activeDropdown === name ? null : name;
    },
    closeDropdowns(e) {
      if (!e.target.closest('.has-dropdown')) {
        this.activeDropdown = null;
      }
    },
    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
  },
};
</script>

<style>
/* ===================== RESET & BASE ===================== */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #1a1a1a;
  background: #fafafa;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

/* ===================== NAVBAR ===================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  border-bottom-color: #e8e8e8;
  box-shadow: 0 1px 8px rgba(0,0,0,0.06);
}

.navbar-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
}

.logo-text {
  letter-spacing: -0.5px;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.navbar-links .nav-item > a,
.navbar-links .nav-item > button {
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.navbar-links .nav-item > a:hover,
.navbar-links .nav-item > button:hover {
  background: #f0f0f0;
}

.chevron {
  font-size: 0.7em;
  margin-left: 2px;
  opacity: 0.6;
}

/* Dropdown */
.has-dropdown {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  padding: 8px;
  min-width: 240px;
  z-index: 100;
}

.dropdown li a {
  display: block;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #333;
  transition: background 0.2s;
}

.dropdown li a:hover {
  background: #f5f5f5;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-login {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 0.95rem;
  color: #444;
  border-radius: 8px;
  transition: background 0.2s;
}

.btn-login:hover {
  background: #f0f0f0;
}

.btn-signup {
  padding: 10px 20px;
  background: #DE483A;
  color: white !important;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 10px;
  transition: background 0.2s;
}

.btn-signup:hover {
  background: #c73a2d;
}

/* Scroll Progress Bar */
.scroll-progress {
  height: 3px;
  background: #f0f0f0;
  width: 100%;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #DE483A, #FF9933, #4073FF);
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
}

/* Section Navigation Dots */
.section-nav {
  background: rgba(255,255,255,0.95);
  border-top: 1px solid #f0f0f0;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 32px;
  height: 36px;
}

.section-dot {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
  transition: all 0.3s;
}

.section-dot.active .dot {
  background: #DE483A;
  transform: scale(1.3);
  box-shadow: 0 0 0 3px rgba(222, 72, 58, 0.2);
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s;
}

.section-dot.active .section-label {
  color: #DE483A;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.mobile-menu-btn span {
  width: 20px;
  height: 2px;
  background: #333;
  border-radius: 2px;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 999;
  padding: 24px;
}

.mobile-menu.open {
  display: block;
}

.mobile-menu ul {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-menu a {
  font-size: 1.1rem;
  font-weight: 500;
  padding: 12px 0;
  display: block;
  border-bottom: 1px solid #f0f0f0;
}

/* ===================== HERO ===================== */
.hero {
  padding: 140px 24px 80px;
  background: linear-gradient(180deg, #fafafa 0%, #fff 50%, #fef4ee 100%);
}

.hero-content {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text h1 {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  color: #1a1a1a;
  margin-bottom: 20px;
  letter-spacing: -1.5px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 16px;
  line-height: 1.6;
}

.hero-reviews {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  font-size: 0.85rem;
  color: #777;
}

.review-icons {
  opacity: 0.5;
}

.btn-cta {
  display: inline-block;
  padding: 16px 36px;
  background: #DE483A;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 12px;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(222, 72, 58, 0.3);
}

.btn-cta:hover {
  background: #c73a2d;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(222, 72, 58, 0.4);
}

.btn-cta.large {
  padding: 18px 48px;
  font-size: 1.2rem;
}

/* App Mockup */
.app-mockup {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);
  overflow: hidden;
}

.mockup-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.mockup-dots {
  display: flex;
  gap: 6px;
}

.mockup-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e0e0e0;
}

.mockup-dots span:first-child { background: #ff5f57; }
.mockup-dots span:nth-child(2) { background: #ffbd2e; }
.mockup-dots span:nth-child(3) { background: #28c840; }

.mockup-title {
  font-weight: 700;
  font-size: 1rem;
  color: #333;
}

.mockup-body {
  padding: 16px 20px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.task-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  flex-shrink: 0;
}

.task-check.done {
  background: #058527;
  border-color: #058527;
}

.task-text {
  flex: 1;
  font-size: 0.9rem;
  color: #333;
}

.task-text.done {
  text-decoration: line-through;
  color: #999;
}

.task-tag {
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #555;
}

/* ===================== SOCIAL PROOF ===================== */
.social-proof {
  padding: 60px 24px;
  background: #fef4ee;
}

.logos-marquee {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.quote-card {
  text-align: center;
}

.quote-card blockquote {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  font-style: italic;
  margin-bottom: 8px;
}

.quote-card cite {
  font-size: 0.85rem;
  color: #888;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

/* ===================== FEATURE SECTIONS ===================== */
.feature-section {
  padding: 120px 24px;
}

.feature-section.alt {
  background: #f7f7f7;
}

.feature-container {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.feature-container.reverse {
  direction: rtl;
}

.feature-container.reverse > * {
  direction: ltr;
}

.feature-label {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  display: block;
}

.feature-text h2 {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.feature-text p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
}

/* Feature Cards */
.feature-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

.card-input {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fafafa;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #eee;
}

.plus-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #DE483A;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.input-text {
  font-size: 0.9rem;
  color: #555;
}

.card-parsed {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.parsed-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f0f7ff;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #4073FF;
}

/* Kanban Board */
.kanban-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.kanban-col {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 16px;
}

.kanban-col h4 {
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kanban-card {
  background: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  color: #333;
}

/* Streak Card */
.streak-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  text-align: center;
}

.streak-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.streak-fire {
  font-size: 1.5rem;
}

.streak-count {
  font-size: 1.3rem;
  font-weight: 800;
  color: #1a1a1a;
}

.streak-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  max-width: 260px;
  margin: 0 auto 12px;
}

.streak-day {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #f0f0f0;
}

.streak-day.filled {
  background: #4073FF;
}

.streak-label {
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Team */
.team-avatars {
  display: flex;
  gap: -8px;
  margin-bottom: 24px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border: 3px solid white;
  margin-left: -8px;
}

.avatar:first-child {
  margin-left: 0;
}

.avatar.add-member {
  background: #e0e0e0;
  color: #999;
  font-size: 1.2rem;
}

.team-activity {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: white;
  border-radius: 10px;
  font-size: 0.85rem;
  color: #555;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ===================== PRICING ===================== */
.pricing-section {
  padding: 120px 24px;
  text-align: center;
}

.pricing-header h2 {
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: #1a1a1a;
}

.pricing-header p {
  font-size: 1.1rem;
  color: #777;
  margin-bottom: 48px;
}

.pricing-cards {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.pricing-card {
  background: white;
  border-radius: 16px;
  padding: 36px 28px;
  text-align: left;
  border: 1px solid #e8e8e8;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}

.pricing-card.popular {
  border-color: #DE483A;
  box-shadow: 0 8px 30px rgba(222, 72, 58, 0.15);
}

.plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #DE483A;
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.pricing-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.plan-price {
  margin-bottom: 24px;
}

.price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
}

.period {
  font-size: 0.95rem;
  color: #888;
}

.plan-features {
  margin-bottom: 28px;
}

.plan-features li {
  padding: 6px 0;
  font-size: 0.9rem;
  color: #555;
}

.btn-plan {
  display: block;
  text-align: center;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  background: #f0f0f0;
  color: #333;
  transition: background 0.2s;
}

.btn-plan:hover {
  background: #e0e0e0;
}

.btn-plan.primary {
  background: #DE483A;
  color: white;
}

.btn-plan.primary:hover {
  background: #c73a2d;
}

/* ===================== CTA SECTION ===================== */
.cta-section {
  padding: 120px 24px;
  background: linear-gradient(135deg, #fef4ee, #fff0e6);
  text-align: center;
}

.cta-section h2 {
  font-size: 2.4rem;
  font-weight: 800;
  max-width: 640px;
  margin: 0 auto 40px;
  line-height: 1.2;
  color: #1a1a1a;
}

.cta-stats {
  display: flex;
  justify-content: center;
  gap: 64px;
  margin-bottom: 40px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat strong {
  font-size: 2rem;
  font-weight: 800;
  color: #DE483A;
}

.stat span {
  font-size: 0.85rem;
  color: #777;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===================== FOOTER ===================== */
.footer {
  background: #1a1a1a;
  color: #aaa;
  padding: 80px 24px 40px;
}

.footer-grid {
  max-width: 1120px;
  margin: 0 auto 60px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer h4 {
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer a {
  font-size: 0.9rem;
  color: #aaa;
  transition: color 0.2s;
}

.footer a:hover {
  color: white;
}

.footer-bottom {
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 30px;
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: white;
}

.footer-bottom p {
  font-size: 0.85rem;
}

.footer-links {
  font-size: 0.85rem;
}

.footer-links a {
  color: #aaa;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 960px) {
  .navbar-links {
    display: none;
  }

  .navbar-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero-text h1 {
    font-size: 2.8rem;
  }

  .hero-reviews {
    justify-content: center;
  }

  .feature-container,
  .feature-container.reverse {
    grid-template-columns: 1fr;
    gap: 40px;
    direction: ltr;
  }

  .pricing-cards {
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .cta-stats {
    flex-direction: column;
    gap: 24px;
  }

  .section-nav-inner {
    gap: 16px;
    overflow-x: auto;
  }

  .section-label {
    display: none;
  }
}

@media (max-width: 600px) {
  .hero-text h1 {
    font-size: 2.2rem;
  }

  .kanban-board {
    grid-template-columns: 1fr;
  }

  .logos-marquee {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
}
</style>
