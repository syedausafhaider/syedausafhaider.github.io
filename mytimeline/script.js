document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");

  // Dynamically create navigation indicators
  timelineItems.forEach(() => {
    const indicator = document.createElement("div");
    document.querySelector(".timeline-indicator").appendChild(indicator);
  });

  const indicators = document.querySelectorAll(".timeline-indicator div");

  // Initially highlight the first section (2025 - Present)
  timelineItems[0].classList.add("active");
  indicators[0].classList.add("active");

  // Intersection Observer Setup
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(timelineItems).indexOf(entry.target);

          // Remove 'active' class from all items and indicators
          timelineItems.forEach((item) => item.classList.remove("active"));
          indicators.forEach((indicator) => indicator.classList.remove("active"));

          // Add 'active' class to the currently intersecting item and its indicator
          entry.target.classList.add("active");
          indicators[index].classList.add("active");
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the item is visible
      rootMargin: "0px", // No additional margin
    }
  );

  // Observe each timeline item
  timelineItems.forEach((item) => {
    observer.observe(item);
  });
});