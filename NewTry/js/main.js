document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0";
      navbar.style.backgroundColor = "rgba(15, 15, 17, 0.95)";
    } else {
      navbar.style.padding = "16px 0";
      navbar.style.backgroundColor = "rgba(15, 15, 17, 0.8)";
    }
  });

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Expand topic content
  const expandButtons = document.querySelectorAll(".expand-btn");

  expandButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);

      if (targetContent.style.display === "block") {
        targetContent.style.display = "none";
        this.setAttribute("aria-expanded", "false");
        this.innerHTML = 'Expand <i class="fas fa-chevron-down"></i>';
      } else {
        targetContent.style.display = "block";
        this.setAttribute("aria-expanded", "true");
        this.innerHTML = 'Collapse <i class="fas fa-chevron-up"></i>';
      }
    });
  });

  // Tab switching
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the parent tab content
      const tabContainer = this.closest(".content-tabs");
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all buttons and panes in this container
      tabContainer.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      tabContainer.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.remove("active");
      });

      // Add active class to clicked button and corresponding pane
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Roadmap timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item");

  // Initially activate the first item
  if (timelineItems.length > 0) {
    timelineItems[0].querySelector(".timeline-content").classList.add("active");
  }

  // Add click event to timeline items
  timelineItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      timelineItems.forEach((i) => {
        i.querySelector(".timeline-content").classList.remove("active");
      });

      // Add active class to clicked item
      this.querySelector(".timeline-content").classList.add("active");
    });
  });

  // Intersection Observer for scroll animations
  const observeElements = document.querySelectorAll(
    ".timeline-item, .topic-card, .stat-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observeElements.forEach((element) => {
    observer.observe(element);
  });

  // Progress tracker functionality
  const topicCheckboxes = document.querySelectorAll(".topic-checkbox");
  const topicsCompletedElem = document.getElementById("topics-completed");
  const problemsSolvedElem = document.getElementById("problems-solved");
  const weeksCompletedElem = document.getElementById("weeks-completed");

  // Progress bar elements
  const progressBars = document.querySelectorAll(".progress-fill");

  // Total values
  const totalTopics = parseInt(
    document.getElementById("total-topics").textContent
  );
  const totalProblems = parseInt(
    document.getElementById("total-problems").textContent
  );
  const totalWeeks = parseInt(
    document.getElementById("total-weeks").textContent
  );

  // Initial progress from localStorage if available
  let completedTopics = 0;
  let problemsSolved = 0;
  let weeksCompleted = 0;

  // Try to load progress from localStorage
  if (localStorage.getItem("dsa-progress")) {
    const savedProgress = JSON.parse(localStorage.getItem("dsa-progress"));
    completedTopics = savedProgress.topics || 0;
    problemsSolved = savedProgress.problems || 0;
    weeksCompleted = savedProgress.weeks || 0;

    // Set checkboxes based on saved progress
    if (savedProgress.checkedTopics) {
      savedProgress.checkedTopics.forEach((id) => {
        const checkbox = document.getElementById(id);
        if (checkbox) checkbox.checked = true;
      });
    }
  }

  // Update UI with current progress
  updateProgressDisplay();

  // Add event listeners to checkboxes
  topicCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      // Count checked topics
      completedTopics = document.querySelectorAll(
        ".topic-checkbox:checked"
      ).length;

      // Roughly estimate problems and weeks based on topics
      problemsSolved = Math.round(
        completedTopics * (totalProblems / totalTopics)
      );
      weeksCompleted = Math.round(completedTopics * (totalWeeks / totalTopics));

      // Update display
      updateProgressDisplay();

      // Save to localStorage
      saveProgress();
    });
  });

  function updateProgressDisplay() {
    // Update counters
    topicsCompletedElem.textContent = completedTopics;
    problemsSolvedElem.textContent = problemsSolved;
    weeksCompletedElem.textContent = weeksCompleted;

    // Update progress bars
    progressBars[0].style.width = `${(completedTopics / totalTopics) * 100}%`;
    progressBars[1].style.width = `${(problemsSolved / totalProblems) * 100}%`;
    progressBars[2].style.width = `${(weeksCompleted / totalWeeks) * 100}%`;
  }

  function saveProgress() {
    // Get IDs of checked topics
    const checkedTopics = Array.from(
      document.querySelectorAll(".topic-checkbox:checked")
    ).map((checkbox) => checkbox.id);

    const progressData = {
      topics: completedTopics,
      problems: problemsSolved,
      weeks: weeksCompleted,
      checkedTopics: checkedTopics,
    };

    localStorage.setItem("dsa-progress", JSON.stringify(progressData));
  }

  // Theme switch functionality
  const themeSwitch = document.querySelector(".theme-switch");

  themeSwitch.addEventListener("click", function () {
    // This would normally toggle between light/dark themes
    // But since we're focusing on a dark theme with neon accents,
    // we could toggle between different accent colors instead

    const root = document.documentElement;
    const currentAccent = getComputedStyle(root)
      .getPropertyValue("--accent-color")
      .trim();

    // Define our neon color options
    const neonColors = {
      blue: {
        color: "var(--neon-blue)",
        glow: "var(--neon-blue-glow)",
      },
      purple: {
        color: "var(--neon-purple)",
        glow: "var(--neon-purple-glow)",
      },
      pink: {
        color: "var(--neon-pink)",
        glow: "var(--neon-pink-glow)",
      },
      green: {
        color: "var(--neon-green)",
        glow: "var(--neon-green-glow)",
      },
    };

    // Determine next color
    let nextColor;
    if (currentAccent.includes("blue")) {
      nextColor = neonColors.purple;
      themeSwitch.innerHTML =
        '<i class="fas fa-moon" style="color: var(--neon-purple)"></i>';
    } else if (currentAccent.includes("purple")) {
      nextColor = neonColors.pink;
      themeSwitch.innerHTML =
        '<i class="fas fa-moon" style="color: var(--neon-pink)"></i>';
    } else if (currentAccent.includes("pink")) {
      nextColor = neonColors.green;
      themeSwitch.innerHTML =
        '<i class="fas fa-moon" style="color: var(--neon-green)"></i>';
    } else {
      nextColor = neonColors.blue;
      themeSwitch.innerHTML =
        '<i class="fas fa-moon" style="color: var(--neon-blue)"></i>';
    }

    // Apply the new color
    root.style.setProperty("--accent-color", nextColor.color);
    root.style.setProperty("--accent-glow", nextColor.glow);
  });
});

// Add this to main.js
// Simple search functionality
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search topics...";
searchInput.classList.add("search-input");

// Insert it into the navbar
const navContainer = document.querySelector(".nav-container");
navContainer.insertBefore(searchInput, document.querySelector(".nav-links"));

// Add search functionality
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const topicCards = document.querySelectorAll(".topic-card");

  topicCards.forEach((card) => {
    const title = card.querySelector(".topic-title").textContent.toLowerCase();
    const description = card
      .querySelector(".topic-description")
      .textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});
