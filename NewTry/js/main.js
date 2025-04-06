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

// Add to main.js or create a new file called visualizations.js
// BST Visualization
document.addEventListener("DOMContentLoaded", function () {
  // Only initialize if the BST visualization exists on the page
  const bstSvg = document.getElementById("bst-svg");
  if (!bstSvg) return;

  // Initialize BST
  const bst = {
    root: null,
    nodeRadius: 25,
    horizontalSpacing: 50,
    verticalSpacing: 70,

    // Create a new node
    createNode: function (value) {
      return {
        value: value,
        left: null,
        right: null,
      };
    },

    // Insert a new value into the BST
    insert: function (value) {
      const newNode = this.createNode(value);

      if (this.root === null) {
        this.root = newNode;
        return;
      }

      const insertNode = function (node, newNode) {
        // If value is less than node value, go left
        if (newNode.value < node.value) {
          if (node.left === null) {
            node.left = newNode;
          } else {
            insertNode(node.left, newNode);
          }
        } else {
          // If value is greater than or equal to node value, go right
          if (node.right === null) {
            node.right = newNode;
          } else {
            insertNode(node.right, newNode);
          }
        }
      };

      insertNode(this.root, newNode);
    },

    // Delete a value from the BST
    delete: function (value) {
      this.root = this.removeNode(this.root, value);
    },

    // Helper function for delete
    removeNode: function (node, key) {
      if (node === null) return null;

      // Search for the node
      if (key < node.value) {
        node.left = this.removeNode(node.left, key);
        return node;
      } else if (key > node.value) {
        node.right = this.removeNode(node.right, key);
        return node;
      } else {
        // Case 1: Node is a leaf (no children)
        if (node.left === null && node.right === null) {
          return null;
        }

        // Case 2: Node has one child
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }

        // Case 3: Node has two children
        // Find the minimum node in the right subtree
        let successor = node.right;
        while (successor.left !== null) {
          successor = successor.left;
        }

        // Replace the node value with successor value
        node.value = successor.value;

        // Delete the successor
        node.right = this.removeNode(node.right, successor.value);
        return node;
      }
    },

    // Search for a value in the BST
    search: function (value) {
      return this.searchNode(this.root, value);
    },

    // Helper function for search
    searchNode: function (node, value) {
      if (node === null) return false;

      if (value < node.value) {
        return this.searchNode(node.left, value);
      } else if (value > node.value) {
        return this.searchNode(node.right, value);
      } else {
        return true; // Value found
      }
    },

    // Calculate positions for each node for visualization
    calculatePositions: function () {
      const width = bstSvg.clientWidth || 800;
      const height = bstSvg.clientHeight || 400;

      // Reset svg
      bstSvg.innerHTML = "";

      if (this.root === null) return;

      // Calculate the height of the tree
      const getHeight = (node) => {
        if (node === null) return 0;
        return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
      };

      const treeHeight = getHeight(this.root);

      // Calculate maximum width of the tree at any level
      const getLevelWidth = (node, level, widths) => {
        if (node === null) return;

        widths[level] = (widths[level] || 0) + 1;

        getLevelWidth(node.left, level + 1, widths);
        getLevelWidth(node.right, level + 1, widths);
      };

      const widths = [];
      getLevelWidth(this.root, 0, widths);
      const maxWidth = Math.max(...widths);

      // Calculate initial horizontal spacing
      const totalWidth = width - 2 * this.nodeRadius;

      // Recursively assign positions to nodes
      const assignPositions = (node, level, leftPos, rightPos) => {
        if (node === null) return;

        const x = (leftPos + rightPos) / 2;
        const y = this.nodeRadius + level * this.verticalSpacing;

        node.x = x;
        node.y = y;

        // Calculate positions for children
        const nextLevel = level + 1;
        const childLeftPos = leftPos;
        const childRightPos = rightPos;

        // Update spacing for children based on level
        const levelRatio = (treeHeight - nextLevel) / treeHeight;
        const childSpacing = (rightPos - leftPos) * levelRatio;

        assignPositions(
          node.left,
          nextLevel,
          childLeftPos,
          x - childSpacing / 2
        );
        assignPositions(
          node.right,
          nextLevel,
          x + childSpacing / 2,
          childRightPos
        );
      };

      assignPositions(this.root, 0, 0, totalWidth);

      // Draw the tree
      this.drawTree();
    },

    // Draw the BST visualization
    drawTree: function () {
      if (this.root === null) return;

      // Clear existing SVG
      bstSvg.innerHTML = "";

      // Create group for links (to ensure they're drawn behind nodes)
      const linksGroup = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      bstSvg.appendChild(linksGroup);

      // Create group for nodes
      const nodesGroup = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      bstSvg.appendChild(nodesGroup);

      // Function to draw nodes and links recursively
      const drawNode = (node) => {
        if (node === null) return;

        // Draw links to children
        if (node.left !== null) {
          const link = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          link.setAttribute("x1", node.x);
          link.setAttribute("y1", node.y);
          link.setAttribute("x2", node.left.x);
          link.setAttribute("y2", node.left.y);
          link.setAttribute("class", "node-link");
          linksGroup.appendChild(link);

          drawNode(node.left);
        }

        if (node.right !== null) {
          const link = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          link.setAttribute("x1", node.x);
          link.setAttribute("y1", node.y);
          link.setAttribute("x2", node.right.x);
          link.setAttribute("y2", node.right.y);
          link.setAttribute("class", "node-link");
          linksGroup.appendChild(link);

          drawNode(node.right);
        }

        // Draw node circle
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        circle.setAttribute("cx", node.x);
        circle.setAttribute("cy", node.y);
        circle.setAttribute("r", this.nodeRadius);
        circle.setAttribute("fill", "#16171b");
        circle.setAttribute("stroke", "#3a80ff");
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("class", "node-circle");
        nodesGroup.appendChild(circle);

        // Draw node value
        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text.setAttribute("x", node.x);
        text.setAttribute("y", node.y);
        text.setAttribute("fill", "#f5f5f7");
        text.setAttribute("class", "node-text");
        text.textContent = node.value;
        nodesGroup.appendChild(text);
      };

      drawNode(this.root);
    },

    // Highlight a node during search operation
    highlightSearchPath: function (value) {
      if (this.root === null) return;

      const highlightPath = (node, value) => {
        if (node === null) return false;

        // Get node circle and highlight it
        const circles = bstSvg.querySelectorAll(".node-circle");
        const texts = bstSvg.querySelectorAll(".node-text");

        for (let i = 0; i < texts.length; i++) {
          if (parseInt(texts[i].textContent) === node.value) {
            // Highlight current node being examined
            circles[i].setAttribute("fill", "rgba(58, 128, 255, 0.3)");
            circles[i].setAttribute("stroke", "#3a80ff");
            circles[i].setAttribute("stroke-width", "3");

            // Wait to see if this is the node we're looking for
            setTimeout(() => {
              if (node.value === value) {
                // Node found - highlight in green
                circles[i].setAttribute("fill", "rgba(54, 226, 189, 0.3)");
                circles[i].setAttribute("stroke", "#36e2bd");
                document.getElementById(
                  "bst-message"
                ).textContent = `Value ${value} found in the tree!`;
              } else {
                // Move to next node in path
                setTimeout(() => {
                  // Reset current node style
                  circles[i].setAttribute("fill", "#16171b");
                  circles[i].setAttribute("stroke", "#3a80ff");
                  circles[i].setAttribute("stroke-width", "2");

                  // Continue search
                  if (value < node.value) {
                    if (!highlightPath(node.left, value)) {
                      document.getElementById(
                        "bst-message"
                      ).textContent = `Value ${value} not found in the tree.`;
                    }
                  } else if (value > node.value) {
                    if (!highlightPath(node.right, value)) {
                      document.getElementById(
                        "bst-message"
                      ).textContent = `Value ${value} not found in the tree.`;
                    }
                  }
                }, 500);
              }
            }, 500);

            return true;
          }
        }

        return false;
      };

      highlightPath(this.root, value);
    },
  };

  // Initial sample tree
  bst.insert(50);
  bst.insert(30);
  bst.insert(70);
  bst.insert(20);
  bst.insert(40);
  bst.insert(60);
  bst.insert(80);

  // Calculate positions and draw the tree
  bst.calculatePositions();

  // Event listeners for buttons
  document.getElementById("bst-insert").addEventListener("click", function () {
    const valueInput = document.getElementById("bst-value");
    const value = parseInt(valueInput.value);

    if (isNaN(value) || value < 1 || value > 99) {
      document.getElementById("bst-message").textContent =
        "Please enter a valid number between 1 and 99.";
      return;
    }

    if (bst.search(value)) {
      document.getElementById(
        "bst-message"
      ).textContent = `Value ${value} already exists in the tree.`;
      return;
    }

    bst.insert(value);
    bst.calculatePositions();
    document.getElementById(
      "bst-message"
    ).textContent = `Value ${value} inserted into the tree.`;
    valueInput.value = "";
  });

  document.getElementById("bst-delete").addEventListener("click", function () {
    const valueInput = document.getElementById("bst-value");
    const value = parseInt(valueInput.value);

    if (isNaN(value)) {
      document.getElementById("bst-message").textContent =
        "Please enter a valid number.";
      return;
    }

    if (!bst.search(value)) {
      document.getElementById(
        "bst-message"
      ).textContent = `Value ${value} doesn't exist in the tree.`;
      return;
    }

    bst.delete(value);
    bst.calculatePositions();
    document.getElementById(
      "bst-message"
    ).textContent = `Value ${value} deleted from the tree.`;
    valueInput.value = "";
  });

  document.getElementById("bst-search").addEventListener("click", function () {
    const valueInput = document.getElementById("bst-value");
    const value = parseInt(valueInput.value);

    if (isNaN(value)) {
      document.getElementById("bst-message").textContent =
        "Please enter a valid number.";
      return;
    }

    document.getElementById(
      "bst-message"
    ).textContent = `Searching for value ${value}...`;
    bst.highlightSearchPath(value);
  });

  // Responsive update - recalculate on window resize
  window.addEventListener("resize", function () {
    bst.calculatePositions();
  });
});

// Add to main.js or create a sorting-visualizer.js
document.addEventListener("DOMContentLoaded", function () {
  // Only initialize if the sorting visualizer exists
  const arrayBarsContainer = document.getElementById("array-bars");
  if (!arrayBarsContainer) return;

  // Sorting visualizer
  const sortingVisualizer = {
    array: [],
    arrayBars: [],
    arraySize: 50,
    animationSpeed: 50,
    animationTimeouts: [],
    sorting: false,

    // Reset the array
    resetArray: function () {
      // Clear any ongoing animations
      this.clearAnimations();

      // Generate new random array
      this.array = [];
      for (let i = 0; i < this.arraySize; i++) {
        this.array.push(Math.floor(Math.random() * 100) + 5);
      }

      // Update visualization
      this.renderArray();
    },

    // Render the array as bars
    renderArray: function () {
      arrayBarsContainer.innerHTML = "";

      const maxValue = Math.max(...this.array);
      const containerWidth = arrayBarsContainer.clientWidth;
      const barWidth = Math.floor(containerWidth / this.arraySize - 2);

      for (let i = 0; i < this.array.length; i++) {
        const bar = document.createElement("div");
        bar.className = "array-bar";
        bar.style.height = `${(this.array[i] / maxValue) * 100}%`;
        bar.style.width = `${barWidth}px`;
        arrayBarsContainer.appendChild(bar);
      }

      this.arrayBars = document.querySelectorAll(".array-bar");
    },

    // Clear all animation timeouts
    clearAnimations: function () {
      for (let i = 0; i < this.animationTimeouts.length; i++) {
        clearTimeout(this.animationTimeouts[i]);
      }
      this.animationTimeouts = [];
      this.sorting = false;
    },

    // Update the algorithm information
    updateAlgorithmInfo: function (algorithm) {
      const timeComplexityElem = document.getElementById("time-complexity");
      const spaceComplexityElem = document.getElementById("space-complexity");
      const descriptionElem = document.getElementById("algorithm-description");

      switch (algorithm) {
        case "bubble":
          timeComplexityElem.textContent = "O(n²)";
          spaceComplexityElem.textContent = "O(1)";
          descriptionElem.textContent =
            "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.";
          break;
        case "selection":
          timeComplexityElem.textContent = "O(n²)";
          spaceComplexityElem.textContent = "O(1)";
          descriptionElem.textContent =
            "Selection Sort finds the minimum element from the unsorted part of the array and puts it at the beginning.";
          break;
        case "insertion":
          timeComplexityElem.textContent = "O(n²)";
          spaceComplexityElem.textContent = "O(1)";
          descriptionElem.textContent =
            "Insertion Sort builds the sorted array one item at a time, similar to how you would sort playing cards.";
          break;
        case "merge":
          timeComplexityElem.textContent = "O(n log n)";
          spaceComplexityElem.textContent = "O(n)";
          descriptionElem.textContent =
            "Merge Sort divides the array into halves, sorts them recursively, then merges the sorted halves.";
          break;
        case "quick":
          timeComplexityElem.textContent =
            "O(n log n) average, O(n²) worst case";
          spaceComplexityElem.textContent = "O(log n)";
          descriptionElem.textContent =
            "Quick Sort selects a pivot element and partitions the array around it, then recursively sorts the sub-arrays.";
          break;
      }
    },

    // Animation for comparing two elements
    animateComparison: function (i, j, delay) {
      const timeout = setTimeout(() => {
        this.arrayBars[i].classList.add("comparing");
        this.arrayBars[j].classList.add("comparing");

        setTimeout(() => {
          this.arrayBars[i].classList.remove("comparing");
          this.arrayBars[j].classList.remove("comparing");
        }, 100);
      }, delay);

      this.animationTimeouts.push(timeout);
    },

    // Animation for swapping two elements
    animateSwap: function (i, j, delay) {
      const timeout = setTimeout(() => {
        // Update heights
        const tempHeight = this.arrayBars[i].style.height;
        this.arrayBars[i].style.height = this.arrayBars[j].style.height;
        this.arrayBars[j].style.height = tempHeight;

        // Also swap in the array
        const temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
      }, delay);

      this.animationTimeouts.push(timeout);
    },

    // Animation for marking element as sorted
    animateSorted: function (index, delay) {
      const timeout = setTimeout(() => {
        this.arrayBars[index].classList.add("sorted");
      }, delay);

      this.animationTimeouts.push(timeout);
    },

    // Bubble Sort implementation with animation
    bubbleSort: function () {
      const n = this.array.length;
      let delay = 0;
      const animationSpeed = 101 - this.animationSpeed; // Invert for intuitive speed control

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          // Animate comparison
          this.animateComparison(j, j + 1, delay);
          delay += animationSpeed;

          // If elements need to be swapped
          if (this.array[j] > this.array[j + 1]) {
            this.animateSwap(j, j + 1, delay);
            delay += animationSpeed;
          }
        }

        // Mark element as sorted
        this.animateSorted(n - i - 1, delay);
      }

      // Mark the first element as sorted
      this.animateSorted(0, delay);

      // Set sorting to false when done
      const finalTimeout = setTimeout(() => {
        this.sorting = false;
      }, delay + animationSpeed);

      this.animationTimeouts.push(finalTimeout);
    },

    // Selection Sort implementation with animation
    selectionSort: function () {
      const n = this.array.length;
      let delay = 0;
      const animationSpeed = 101 - this.animationSpeed;

      for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
          // Animate comparison
          this.animateComparison(minIndex, j, delay);
          delay += animationSpeed;

          if (this.array[j] < this.array[minIndex]) {
            minIndex = j;
          }
        }

        // Swap the found minimum element with the first element
        if (minIndex !== i) {
          this.animateSwap(i, minIndex, delay);
          delay += animationSpeed;
        }

        // Mark element as sorted
        this.animateSorted(i, delay);
      }

      // Mark the last element as sorted
      this.animateSorted(n - 1, delay);

      // Set sorting to false when done
      const finalTimeout = setTimeout(() => {
        this.sorting = false;
      }, delay + animationSpeed);

      this.animationTimeouts.push(finalTimeout);
    },

    // Insertion Sort implementation with animation
    insertionSort: function () {
      const n = this.array.length;
      let delay = 0;
      const animationSpeed = 101 - this.animationSpeed;

      // Mark first element as sorted
      this.animateSorted(0, 0);

      for (let i = 1; i < n; i++) {
        const key = this.array[i];
        let j = i - 1;

        // Compare key with each element on the left until a smaller element is found
        while (j >= 0 && this.array[j] > key) {
          this.animateComparison(j, j + 1, delay);
          delay += animationSpeed;

          // Move elements to the right
          this.animateSwap(j, j + 1, delay);
          delay += animationSpeed;

          j--;
        }

        // Mark the element as sorted
        this.animateSorted(i, delay);
      }

      // Set sorting to false when done
      const finalTimeout = setTimeout(() => {
        this.sorting = false;
      }, delay + animationSpeed);

      this.animationTimeouts.push(finalTimeout);
    },

    // Simple implementation for Merge Sort animation (visual only)
    mergeSort: function () {
      // For simplicity, we'll just show the merge steps without actual implementation
      // In a real implementation, we would track all the comparisons and swaps

      // Clone array to avoid modifying the original during sort
      const sortedArray = [...this.array].sort((a, b) => a - b);

      let delay = 0;
      const animationSpeed = 101 - this.animationSpeed;

      // Mark everything as comparing initially
      for (let i = 0; i < this.array.length; i++) {
        const timeout = setTimeout(() => {
          this.arrayBars[i].classList.add("comparing");
        }, delay);
        this.animationTimeouts.push(timeout);
      }

      delay += animationSpeed * 2;

      // Update heights to show sorted array
      for (let i = 0; i < this.array.length; i++) {
        const timeout = setTimeout(() => {
          const maxValue = Math.max(...sortedArray);
          this.arrayBars[i].style.height = `${
            (sortedArray[i] / maxValue) * 100
          }%`;
          this.arrayBars[i].classList.remove("comparing");
          this.arrayBars[i].classList.add("sorted");

          // Update the actual array
          this.array[i] = sortedArray[i];
        }, delay + i * animationSpeed);

        this.animationTimeouts.push(timeout);
      }

      // Set sorting to false when done
      const finalTimeout = setTimeout(() => {
        this.sorting = false;
      }, delay + this.array.length * animationSpeed);

      this.animationTimeouts.push(finalTimeout);
    },

    // Simple implementation for Quick Sort animation (visual only)
    quickSort: function () {
      // For simplicity, similar to merge sort, we'll just show the result
      // In a real implementation, we would animate the partitioning steps

      // Clone array to avoid modifying the original during sort
      const sortedArray = [...this.array].sort((a, b) => a - b);

      let delay = 0;
      const animationSpeed = 101 - this.animationSpeed;

      // Mark everything as comparing initially
      for (let i = 0; i < this.array.length; i++) {
        const timeout = setTimeout(() => {
          this.arrayBars[i].classList.add("comparing");
        }, delay);
        this.animationTimeouts.push(timeout);
      }

      delay += animationSpeed * 2;

      // Update heights to show sorted array
      for (let i = 0; i < this.array.length; i++) {
        const timeout = setTimeout(() => {
          const maxValue = Math.max(...sortedArray);
          this.arrayBars[i].style.height = `${
            (sortedArray[i] / maxValue) * 100
          }%`;
          this.arrayBars[i].classList.remove("comparing");
          this.arrayBars[i].classList.add("sorted");

          // Update the actual array
          this.array[i] = sortedArray[i];
        }, delay + i * animationSpeed);

        this.animationTimeouts.push(timeout);
      }

      // Set sorting to false when done
      const finalTimeout = setTimeout(() => {
        this.sorting = false;
      }, delay + this.array.length * animationSpeed);

      this.animationTimeouts.push(finalTimeout);
    },

    // Sort the array using the selected algorithm
    sort: function (algorithm) {
      if (this.sorting) return;
      this.sorting = true;

      // Reset bar styles
      for (let i = 0; i < this.arrayBars.length; i++) {
        this.arrayBars[i].className = "array-bar";
      }

      // Run the selected sorting algorithm
      switch (algorithm) {
        case "bubble":
          this.bubbleSort();
          break;
        case "selection":
          this.selectionSort();
          break;
        case "insertion":
          this.insertionSort();
          break;
        case "merge":
          this.mergeSort();
          break;
        case "quick":
          this.quickSort();
          break;
      }
    },
  };

  // Initialize with a random array
  sortingVisualizer.resetArray();

  // Event listeners
  document
    .getElementById("generate-array")
    .addEventListener("click", function () {
      if (sortingVisualizer.sorting) return;
      sortingVisualizer.resetArray();
    });

  document
    .getElementById("start-sorting")
    .addEventListener("click", function () {
      if (sortingVisualizer.sorting) return;
      const algorithm = document.getElementById("algorithm-select").value;
      sortingVisualizer.sort(algorithm);
    });

  document.getElementById("reset-array").addEventListener("click", function () {
    sortingVisualizer.clearAnimations();
    sortingVisualizer.resetArray();
  });

  document
    .getElementById("sorting-speed")
    .addEventListener("input", function () {
      sortingVisualizer.animationSpeed = parseInt(this.value);
    });

  document
    .getElementById("algorithm-select")
    .addEventListener("change", function () {
      sortingVisualizer.updateAlgorithmInfo(this.value);
    });

  // Initial algorithm info
  sortingVisualizer.updateAlgorithmInfo("bubble");

  // Responsive update
  window.addEventListener("resize", function () {
    if (!sortingVisualizer.sorting) {
      sortingVisualizer.renderArray();
    }
  });
});

// Add to main.js
document.addEventListener("DOMContentLoaded", function () {
  // Check if code editor exists
  const codeInput = document.getElementById("code-input");
  if (!codeInput) return;

  // Code editor functionality
  const editorTabs = document.querySelectorAll(".editor-tab");
  const editorPanes = document.querySelectorAll(".editor-pane");
  const runCodeBtn = document.getElementById("run-code");
  const resetCodeBtn = document.getElementById("reset-code");
  const codeTemplateSelect = document.getElementById("code-template");
  const outputDisplay = document.getElementById("output-display");

  // Default code
  const defaultCode = `// Write your C++ code here
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  
  // Try changing this code
  for(int i = 1; i <= 5; i++) {
      cout << i << " ";
  }
  
  return 0;
}`;

  // Other code templates
  const codeTemplates = {
    arrays: `// Array operations example
#include <iostream>
using namespace std;

int main() {
  // Declare and initialize array
  int arr[5] = {10, 20, 30, 40, 50};
  
  // Print original array
  cout << "Original array: ";
  for(int i = 0; i < 5; i++) {
      cout << arr[i] << " ";
  }
  cout << endl;
  
  // Modify array
  arr[2] = 99;
  
  // Print modified array
  cout << "Modified array: ";
  for(int i = 0; i < 5; i++) {
      cout << arr[i] << " ";
  }
  cout << endl;
  
  // Calculate sum
  int sum = 0;
  for(int i = 0; i < 5; i++) {
      sum += arr[i];
  }
  cout << "Sum of array elements: " << sum << endl;
  
  return 0;
}`,

    "linked-list": `// Singly linked list implementation
#include <iostream>
using namespace std;

// Node structure
struct Node {
  int data;
  Node* next;
  
  // Constructor
  Node(int val) : data(val), next(nullptr) {}
};

// Function to insert at beginning
void insertAtBeginning(Node* &head, int val) {
  Node* newNode = new Node(val);
  newNode->next = head;
  head = newNode;
}

// Function to print the list
void printList(Node* head) {
  Node* temp = head;
  while(temp != nullptr) {
      cout << temp->data << " -> ";
      temp = temp->next;
  }
  cout << "nullptr" << endl;
}

int main() {
  Node* head = nullptr;
  
  // Insert some values
  insertAtBeginning(head, 5);
  insertAtBeginning(head, 10);
  insertAtBeginning(head, 15);
  
  // Print the list
  cout << "Linked List: ";
  printList(head);
  
  return 0;
}`,

    recursion: `// Factorial using recursion
#include <iostream>
using namespace std;

// Recursive factorial function
int factorial(int n) {
  // Base case
  if (n == 0 || n == 1) {
      return 1;
  }
  
  // Recursive case
  return n * factorial(n - 1);
}

int main() {
  // Calculate factorial of numbers 0 through 5
  for(int i = 0; i <= 5; i++) {
      cout << "Factorial of " << i << " is: " << factorial(i) << endl;
  }
  
  return 0;
}`,
  };

  // Tab switching
  editorTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs and panes
      editorTabs.forEach((t) => t.classList.remove("active"));
      editorPanes.forEach((p) => p.classList.remove("active"));

      // Add active class to current tab and corresponding pane
      this.classList.add("active");
      document
        .getElementById(this.getAttribute("data-tab"))
        .classList.add("active");
    });
  });

  // Run code (simulated)
  runCodeBtn.addEventListener("click", function () {
    const code = codeInput.value;

    // Simple simulation of C++ output for demo purposes
    let output = "Compiling...\n";

    // Very basic simulation of output based on code content
    if (code.includes("cout")) {
      output += "\nOutput:\n";

      // Extract cout statements (very simplified)
      const lines = code.split("\n");
      for (const line of lines) {
        if (line.includes("cout <<")) {
          // Parse the cout statement (extremely simplified)
          let content = line.split("cout <<")[1];

          // Handle endl
          if (content.includes("endl")) {
            content = content.replace("endl", "\n");
          }

          // Handle string literals
          const stringMatch = content.match(/"([^"]*)"/);
          if (stringMatch) {
            output += stringMatch[1];
          }

          // For loops (extremely simplified simulation)
          if (line.includes("for") && code.includes("i <=")) {
            const forMatch = code.match(
              /for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<=\s*(\d+)/
            );
            if (forMatch) {
              const start = parseInt(forMatch[1]);
              const end = parseInt(forMatch[2]);

              if (content.includes("i")) {
                for (let i = start; i <= end; i++) {
                  output += i + " ";
                }
              }
            }
          }

          if (!content.includes("i")) {
            output += "\n";
          }
        }
      }

      // Special case for factorial example
      if (code.includes("factorial") && code.includes("Factorial of")) {
        output = "Compiling...\n\nOutput:\n";
        for (let i = 0; i <= 5; i++) {
          // Calculate factorial
          let factorial = 1;
          for (let j = 2; j <= i; j++) {
            factorial *= j;
          }
          output += `Factorial of ${i} is: ${factorial}\n`;
        }
      }

      // Special case for linked list example
      if (code.includes("struct Node") && code.includes("insertAtBeginning")) {
        output =
          "Compiling...\n\nOutput:\nLinked List: 15 -> 10 -> 5 -> nullptr\n";
      }

      // Special case for arrays example
      if (code.includes("int arr[5]") && code.includes("Modified array")) {
        output =
          "Compiling...\n\nOutput:\nOriginal array: 10 20 30 40 50 \nModified array: 10 20 99 40 50 \nSum of array elements: 219\n";
      }
    } else {
      output += "\nNo output statements found.";
    }

    // Display the output
    outputDisplay.textContent = output;

    // Switch to output tab
    document.querySelector('[data-tab="cpp-output"]').click();
  });

  // Reset code
  resetCodeBtn.addEventListener("click", function () {
    codeInput.value = defaultCode;
    outputDisplay.textContent = "";
  });

  // Change code template
  codeTemplateSelect.addEventListener("change", function () {
    const template = this.value;
    if (template === "default") {
      codeInput.value = defaultCode;
    } else {
      codeInput.value = codeTemplates[template];
    }
    outputDisplay.textContent = "";
  });
});

// Add to main.js
document.addEventListener("DOMContentLoaded", function () {
  // Progress tracking enhancement
  const topicCheckboxes = document.querySelectorAll(".topic-checkbox");
  if (topicCheckboxes.length === 0) return;

  const topicsCompletedElem = document.getElementById("topics-completed");
  const problemsSolvedElem = document.getElementById("problems-solved");
  const weeksCompletedElem = document.getElementById("weeks-completed");
  const progressBars = document.querySelectorAll(".progress-fill");

  // Problem counts for each topic
  const topicProblems = {
    "check-cpp-basics": 15,
    "check-arrays": 20,
    "check-linked-lists": 15,
    "check-stacks-queues": 12,
    "check-recursion": 18,
    "check-searching": 10,
    "check-trees": 20,
    "check-graphs": 15,
    "check-dp": 25,
    "check-advanced": 15,
  };

  // Week estimates for each topic
  const topicWeeks = {
    "check-cpp-basics": 2,
    "check-arrays": 3,
    "check-linked-lists": 2,
    "check-stacks-queues": 2,
    "check-recursion": 3,
    "check-searching": 2,
    "check-trees": 3,
    "check-graphs": 4,
    "check-dp": 4,
    "check-advanced": 3,
  };

  // Load saved progress
  function loadProgress() {
    if (localStorage.getItem("dsa-progress")) {
      const savedProgress = JSON.parse(localStorage.getItem("dsa-progress"));

      // Check boxes based on saved progress
      if (savedProgress.completedTopics) {
        savedProgress.completedTopics.forEach((id) => {
          const checkbox = document.getElementById(id);
          if (checkbox) checkbox.checked = true;
        });
      }

      updateProgressDisplay();
    }
  }

  // Save progress
  function saveProgress() {
    const completedTopics = Array.from(
      document.querySelectorAll(".topic-checkbox:checked")
    ).map((checkbox) => checkbox.id);

    // Calculate problems solved
    let problemsSolved = 0;
    completedTopics.forEach((id) => {
      problemsSolved += topicProblems[id] || 0;
    });

    // Calculate weeks completed
    let weeksCompleted = 0;
    completedTopics.forEach((id) => {
      weeksCompleted += topicWeeks[id] || 0;
    });

    const progressData = {
      completedTopics: completedTopics,
      problemsSolved: problemsSolved,
      weeksCompleted: weeksCompleted,
    };

    localStorage.setItem("dsa-progress", JSON.stringify(progressData));
  }

  // Update progress display
  function updateProgressDisplay() {
    const completedTopics = document.querySelectorAll(
      ".topic-checkbox:checked"
    ).length;
    const totalTopics = topicCheckboxes.length;

    // Calculate problems solved
    let problemsSolved = 0;
    document.querySelectorAll(".topic-checkbox:checked").forEach((checkbox) => {
      problemsSolved += topicProblems[checkbox.id] || 0;
    });

    // Calculate weeks completed
    let weeksCompleted = 0;
    document.querySelectorAll(".topic-checkbox:checked").forEach((checkbox) => {
      weeksCompleted += topicWeeks[checkbox.id] || 0;
    });

    // Calculate total values
    const totalProblems = Object.values(topicProblems).reduce(
      (a, b) => a + b,
      0
    );
    const totalWeeks = Object.values(topicWeeks).reduce((a, b) => a + b, 0);

    // Update counters
    topicsCompletedElem.textContent = completedTopics;
    document.getElementById("total-topics").textContent = totalTopics;

    problemsSolvedElem.textContent = problemsSolved;
    document.getElementById("total-problems").textContent = totalProblems;

    weeksCompletedElem.textContent = weeksCompleted;
    document.getElementById("total-weeks").textContent = totalWeeks;

    // Update progress bars
    progressBars[0].style.width = `${(completedTopics / totalTopics) * 100}%`;
    progressBars[1].style.width = `${(problemsSolved / totalProblems) * 100}%`;
    progressBars[2].style.width = `${(weeksCompleted / totalWeeks) * 100}%`;
  }

  // Add event listeners to checkboxes
  topicCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      updateProgressDisplay();
      saveProgress();

      // Update roadmap timeline
      const topicId = this.id.replace("check-", "");
      const timelineItem = document.querySelector(
        `[data-stage="${getStageNumber(topicId)}"]`
      );
      if (timelineItem) {
        const timelineContent = timelineItem.querySelector(".timeline-content");
        if (this.checked) {
          timelineContent.classList.add("completed");
        } else {
          timelineContent.classList.remove("completed");
        }
      }
    });
  });

  // Helper function to get stage number from topic ID
  function getStageNumber(topicId) {
    const stageMap = {
      "cpp-basics": 1,
      arrays: 2,
      "linked-lists": 3,
      "stacks-queues": 4,
      recursion: 5,
      searching: 6,
      trees: 7,
      graphs: 8,
      dp: 9,
      advanced: 10,
    };

    return stageMap[topicId] || 1;
  }

  // Add this to style.css
  /*
  .timeline-content.completed .timeline-card {
      border: 2px solid var(--neon-green);
      box-shadow: 0 5px 15px var(--neon-green-glow);
  }
  
  .timeline-content.completed .timeline-marker {
      background-color: var(--neon-green);
      box-shadow: 0 0 15px var(--neon-green-glow);
  }
  */

  // Add completed class to CSS
  const style = document.createElement("style");
  style.textContent = `
      .timeline-content.completed .timeline-card {
          border: 2px solid var(--neon-green);
          box-shadow: 0 5px 15px var(--neon-green-glow);
      }
      
      .timeline-content.completed .timeline-marker {
          background-color: var(--neon-green);
          box-shadow: 0 0 15px var(--neon-green-glow);
      }
  `;
  document.head.appendChild(style);

  // Load progress on page load
  loadProgress();
});

// Add to main.js
document.addEventListener("DOMContentLoaded", function () {
  // Difficulty tabs
  const difficultyTabs = document.querySelectorAll(".difficulty-tab");
  if (difficultyTabs.length === 0) return;

  difficultyTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs and content
      difficultyTabs.forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".difficulty-content")
        .forEach((c) => c.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      this.classList.add("active");
      const difficulty = this.getAttribute("data-difficulty");
      document.getElementById(`${difficulty}-problems`).classList.add("active");
    });
  });
});

// Add to main.js
document.addEventListener("DOMContentLoaded", function () {
  // Code tab functionality
  const codeTabBtns = document.querySelectorAll(".code-tab-btn");
  if (codeTabBtns.length > 0) {
    codeTabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Find parent container
        const tabContainer = this.closest(".code-tabs");

        // Remove active class from all buttons and panes in this container
        tabContainer.querySelectorAll(".code-tab-btn").forEach((b) => {
          b.classList.remove("active");
        });

        tabContainer.querySelectorAll(".code-tab-pane").forEach((p) => {
          p.classList.remove("active");
        });

        // Add active class to clicked button and corresponding pane
        this.classList.add("active");
        const codeId = this.getAttribute("data-code");
        document.getElementById(codeId).classList.add("active");
      });
    });
  }

  // Fix for difficulty tabs in the DP section
  document.querySelectorAll(".difficulty-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      // Find the closest parent that contains both tabs and content
      const tabContainer = this.closest(".practice-problems");

      // Remove active class from all tabs in this container
      tabContainer.querySelectorAll(".difficulty-tab").forEach((t) => {
        t.classList.remove("active");
      });

      // Remove active class from all content panes in this container
      tabContainer.querySelectorAll(".difficulty-content").forEach((c) => {
        c.classList.remove("active");
      });

      // Add active class to clicked tab
      this.classList.add("active");

      // Add active class to corresponding content
      const difficulty = this.getAttribute("data-difficulty");
      const contentId = `${difficulty}-problems`;

      // Try the specific ID first
      let contentPane = tabContainer.querySelector(`#${contentId}-dp`);

      // If not found, try the generic ID
      if (!contentPane) {
        contentPane = tabContainer.querySelector(`#${contentId}`);
      }

      if (contentPane) {
        contentPane.classList.add("active");
      }
    });
  });
});
