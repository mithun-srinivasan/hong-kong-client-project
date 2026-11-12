/* ==========================================================================
   Azhar - portfolio site
   Small progressive enhancements that reproduce the original behaviour:
     1. Live clock (digital time/date + analogue hands)
     2. Videos start playing when they scroll into view
     3. Hairline rules draw themselves in when they scroll into view
   ========================================================================== */
(() => {
  "use strict";

  /* ------------------------------------------------------------------
     1. Live clock
     The original Framer build renders the clock in the *visitor's* own
     timezone (the "GMT+8" heading is just a label), so we deliberately do
     not pass a `timeZone` option to Intl - the browser's local zone is used.
     ------------------------------------------------------------------ */

  const timeElement = document.getElementById("clock-time");
  const dateElement = document.getElementById("clock-date");
  const clockElement = document.querySelector(".clock");

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  /** Reads the hour/minute/second of "now" in the local timezone. */
  const partsFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const getLocalTime = () => {
    const parts = partsFormatter.formatToParts(new Date());
    const read = (type) => Number(parts.find((part) => part.type === type).value);
    return { hour: read("hour"), minute: read("minute"), second: read("second") };
  };

  /** Rotates the three hands of the analogue clock. */
  const updateHands = ({ hour, minute, second }) => {
    if (!clockElement) return;

    // A full turn is 360deg: 12 hours for the hour hand, 60 for the others.
    const angles = {
      "clock__hand--hour": ((hour % 12) + minute / 60) * 30,
      "clock__hand--minute": (minute + second / 60) * 6,
      "clock__hand--second": second * 6,
    };

    for (const [className, angle] of Object.entries(angles)) {
      const hand = clockElement.querySelector(`.${className}`);
      if (hand) hand.style.setProperty("--angle", `${angle}deg`);
    }
  };

  const updateClock = () => {
    const now = new Date();
    if (timeElement) timeElement.textContent = timeFormatter.format(now);
    if (dateElement) dateElement.textContent = dateFormatter.format(now);
    updateHands(getLocalTime());
  };

  if (timeElement || dateElement || clockElement) {
    updateClock();
    // Refresh every second so the second hand sweeps continuously.
    setInterval(updateClock, 1000);
  }

  /* ------------------------------------------------------------------
     2. Videos play only while they are on screen
     ------------------------------------------------------------------ */
  const videos = Array.from(document.querySelectorAll("video")).filter((video) => {
    // Framer renders a placeholder for empty sources - those stay as posters.
    const source = video.getAttribute("src");
    return Boolean(source) && source !== "null";
  });

  if (videos.length) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.preload = "auto";
            video.play().catch(() => {
              /* Autoplay can still be blocked - the poster stays visible. */
            });
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    videos.forEach((video) => videoObserver.observe(video));
  }

  /* ------------------------------------------------------------------
     3. Hairline rules animate in when they scroll into view
     ------------------------------------------------------------------ */
  const rules = Array.from(document.querySelectorAll(".rule"));

  if (rules.length) {
    const ruleObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            ruleObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 }
    );

    rules.forEach((rule) => ruleObserver.observe(rule));
  }
})();
