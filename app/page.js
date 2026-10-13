"use client";

import { useEffect, useState } from "react";

const rounds = [
  {
    word: "HAPPINESS",
    hint: "A feeling of joy, satisfaction, or contentment.",
    category: "POSITIVE EMOTIONS",
  },
  {
    word: "ANXIETY",
    hint: "A feeling of worry, nervousness, or fear.",
    category: "EMOTIONAL WELL-BEING",
  },
  {
    word: "STRESS",
    hint: "The feeling of pressure when facing challenges.",
    category: "STRESS MANAGEMENT",
  },
  {
    word: "EMPATHY",
    hint: "Understanding and sharing another person's feelings.",
    category: "EMOTIONAL AWARENESS",
  },
  {
    word: "CONFIDENCE",
    hint: "Believing in your own abilities.",
    category: "SELF-ESTEEM",
  },
  {
    word: "LONELINESS",
    hint: "Feeling alone or disconnected from others.",
    category: "SOCIAL WELL-BEING",
  },
  {
    word: "MINDFULNESS",
    hint: "Paying attention to the present moment.",
    category: "SELF-CARE",
  },
  {
    word: "RESILIENCE",
    hint: "The ability to recover from difficult experiences.",
    category: "INNER STRENGTH",
  },
  {
    word: "SLEEP",
    hint: "An important part of maintaining mental and physical health.",
    category: "HEALTHY HABITS",
  },
  {
    word: "FRIENDSHIP",
    hint: "A caring connection that can provide support and belonging.",
    category: "SOCIAL SUPPORT",
  },
  {
    word: "KINDNESS",
    hint: "Being caring, helpful, and considerate toward others.",
    category: "POSITIVE ACTIONS",
  },
  {
    word: "EMOTIONS",
    hint: "Feelings such as happiness, sadness, anger, and fear.",
    category: "UNDERSTANDING FEELINGS",
  },
  {
    word: "RELAXATION",
    hint: "The process of becoming calm and reducing tension.",
    category: "STRESS RELIEF",
  },
  {
    word: "SELFCARE",
    hint: "Actions you take to look after your own well-being.",
    category: "HEALTHY HABITS",
  },
  {
    word: "HOPE",
    hint: "The feeling that better things are possible.",
    category: "POSITIVE THINKING",
  },
];

function shuffleWord(word) {
  const letters = word.split("");

  for (let attempt = 0; attempt < 50; attempt++) {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    if (letters.join("") !== word) {
      return letters.join("");
    }
  }

  return word.split("").reverse().join("");
}

export default function Home() {
  const [screen, setScreen] = useState("home");
  const [roundIndex, setRoundIndex] = useState(0);
  const [seconds, setSeconds] = useState(15);
  const [timeUp, setTimeUp] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [shuffledWord, setShuffledWord] = useState("");

  const currentRound = rounds[roundIndex];

  function startGame() {
    setRoundIndex(0);
    setSeconds(15);
    setTimeUp(false);
    setRevealed(false);
    setShuffledWord(shuffleWord(rounds[0].word));
    setScreen("game");
  }

  function revealWord() {
    if (!timeUp || revealed) return;
    setRevealed(true);
  }

  function nextRound() {
    const next = roundIndex + 1;

    if (next >= rounds.length) {
      setScreen("complete");
      return;
    }

    setRoundIndex(next);
    setSeconds(15);
    setTimeUp(false);
    setRevealed(false);
    setShuffledWord(shuffleWord(rounds[next].word));
  }

  useEffect(() => {
    if (screen !== "game" || timeUp) return;

    const timer = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setTimeUp(true);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, roundIndex, timeUp]);

  const displayedWord = revealed ? currentRound.word : shuffledWord;

  const progress = ((roundIndex + 1) / rounds.length) * 100;

  return (
    <main className="game-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {screen === "home" && (
        <section className="welcome screen-card">
          <div className="hero-icon">
            <span className="hero-orbit orbit-one" />
            <span className="hero-orbit orbit-two" />
            <span className="brain-icon">🧠</span>
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✧</span>
          </div>

          <div className="eyebrow">
            <span className="eyebrow-line" />
            MENTAL HEALTH AWARENESS
            <span className="eyebrow-line" />
          </div>

          <h1 className="hero-title">
            YOUR MIND.
            <br />
            <span>YOUR CHALLENGE.</span>
          </h1>

          <p className="hero-description">
            Think fast. Decode the words. Discover the language of mental
            health. Can you solve all 15 challenges?
          </p>

          <div className="game-stats">
            <div className="stat">
              <span className="stat-icon">◈</span>
              <strong>15</strong>
              <span>ROUNDS</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-icon">◷</span>
              <strong>15s</strong>
              <span>PER ROUND</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-icon">✧</span>
              <strong>HARD</strong>
              <span>DIFFICULTY</span>
            </div>
          </div>

          <button className="primary-button start-button" onClick={startGame}>
            <span>START THE CHALLENGE</span>
            <span className="button-arrow">→</span>
          </button>

          <p className="welcome-note">
            AWARENESS IS THE FIRST STEP TOWARD UNDERSTANDING.
          </p>

          <div className="credits">
            <span>DESIGNED FOR</span>
            <strong>BCR409</strong>
            <span className="credit-star">✦</span>
            <span>MENTAL HEALTH AWARENESS</span>
          </div>
        </section>
      )}

      {screen === "game" && (
        <section className="game-card screen-card">
          <div className="game-heading">
            <header className="topbar">
              <div className="brand">
                <span className="brand-icon">✳</span>
                <span>
                  MIND<span className="brand-highlight">QUEST</span>
                </span>
              </div>

              <div className="presenter-badge">
                <span className="live-dot" />
                PRESENTED BY BCR409
              </div>
            </header>

            <div className="round-counter">
              <span>ROUND</span>
              <strong>
                {String(roundIndex + 1).padStart(2, "0")}
                <span> / 15</span>
              </strong>
            </div>
          </div>

          {/* <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div> */}

          <div className="challenge-label">
            <span className="challenge-dot" />
            {currentRound.category}
          </div>

          <div className="puzzle-panel">
            {/* <div className="puzzle-top">
              <span>DECODE THIS WORD</span>
              <span className="letter-count">
                {currentRound.word.length} LETTERS
              </span>
            </div> */}

            <div
              className={`word-display ${revealed ? "word-revealed" : ""}`}
              aria-live="polite"
            >
              {displayedWord.split("").map((letter, index) => (
                <span
                  key={`${roundIndex}-${revealed}-${index}-${letter}`}
                  className="letter"
                  style={
                    revealed ? { animationDelay: `${index * 0.055}s` } : {}
                  }
                >
                  {letter}
                </span>
              ))}
            </div>
            {revealed && (
              <p className="meaning-label">{currentRound.hint}</p>
              // <div className="meaning-panel">
              //   <div className="meaning-label">
              //     <span>✦</span> DID YOU KNOW?
              //   </div>

              // </div>
            )}

            {/* <div className="puzzle-bottom">
              <span className="mini-spark">✦</span>
              {revealed
                ? "DECODE COMPLETE"
                : timeUp
                  ? "TIME'S UP — READY TO REVEAL?"
                  : "REARRANGE THE LETTERS IN YOUR MIND"}
            </div> */}
          </div>

          <div
            className={`timer-panel ${seconds <= 5 && !timeUp ? "timer-warning" : ""}`}
          >
            <div className="timer-info">
              <span className="timer-icon">◷</span>
              <div>
                <strong>{timeUp ? "TIME'S UP!" : "TIME REMAINING"}</strong>
                <span>
                  {timeUp
                    ? "Reveal the word to continue"
                    : "Think quickly. Stay focused."}
                </span>
              </div>
            </div>

            <div className="timer-number">
              00<span>:</span>
              {String(seconds).padStart(2, "0")}
            </div>
          </div>

          {!timeUp && (
            <div className="waiting-message">
              <span className="pulse-dot" />
              YOUR MIND IS YOUR SUPERPOWER
            </div>
          )}

          {timeUp && !revealed && (
            <button
              className="primary-button action-button"
              onClick={revealWord}
            >
              <span>✧</span>
              <span>REVEAL WORD</span>
              <span className="button-arrow">→</span>
            </button>
          )}

          {revealed && (
            <button
              className="primary-button action-button"
              onClick={nextRound}
            >
              <span>
                {roundIndex === rounds.length - 1
                  ? "FINISH CHALLENGE"
                  : "NEXT CHALLENGE"}
              </span>
              <span className="button-arrow">→</span>
            </button>
          )}

          {/* <footer className="game-footer">
            <span>✳ MINDQUEST</span>
            <span>
              PRESENTED BY <strong>BCR409</strong>
            </span>
          </footer> */}
        </section>
      )}

      {screen === "complete" && (
        <section className="welcome screen-card">
          <div className="hero-icon">
            <span className="brain-icon">💚</span>
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✧</span>
          </div>

          <div className="eyebrow">
            <span className="eyebrow-line" />
            CHALLENGE COMPLETE
            <span className="eyebrow-line" />
          </div>

          <h1 className="hero-title">
            KEEP THE
            <br />
            <span>CONVERSATION GOING.</span>
          </h1>

          <p className="hero-description">
            Mental health awareness begins with learning, listening, and
            understanding. Every conversation can make a difference.
          </p>

          <button className="primary-button start-button" onClick={startGame}>
            <span>PLAY AGAIN</span>
            <span className="button-arrow">↻</span>
          </button>

          <div className="credits">
            <span>PROUDLY PRESENTED BY</span>
            <strong>BCR409</strong>
            <span className="credit-star">✦</span>
            <span>YOUR MIND MATTERS</span>
          </div>
        </section>
      )}

      {/* <footer className="page-footer">
        <span>MENTAL HEALTH MATTERS. EVERY MIND MATTERS.</span>
        <span>© BCR409 · MINDQUEST</span>
      </footer> */}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #0b1020;
        }

        button {
          font: inherit;
        }

        .game-page {
          --mint: #76f7cf;
          --purple: #a78bfa;
          --muted: #8d9ab7;
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          padding: 22px clamp(16px, 5vw, 64px) 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 15% 10%, #35225d 0%, transparent 38%),
            radial-gradient(ellipse at 85% 80%, #123c4a 0%, transparent 40%),
            #0b1020;
          color: #f7f8ff;
          font-family: Arial, Helvetica, sans-serif;
        }

        .ambient {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.13;
          pointer-events: none;
          z-index: -1;
        }

        .ambient-one {
          top: 25%;
          left: -180px;
          background: #9b5cff;
        }

        .ambient-two {
          right: -160px;
          bottom: 10%;
          background: #36e9bd;
        }

        .topbar {
          width: max-content;
          max-width: 1120px;

          margin-bottom: 26px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .brand-icon {
          color: var(--mint);
          font-size: 29px;
        }

        .brand-highlight {
          color: var(--mint);
        }

        .presenter-badge {
          display: flex;
          align-items: center;
          gap: 9px;
          width: max-content;
          padding: 10px 13px;
          border: 1px solid #ffffff1c;
          border-radius: 30px;
          background: #ffffff08;
          color: #d6d9e9;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .live-dot,
        .challenge-dot,
        .pulse-dot {
          width: 7px;
          height: 7px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: var(--mint);
          box-shadow: 0 0 12px #76f7cf88;
        }

        .screen-card {
          width: 100%;
          max-width: 820px;
          margin: auto 0;
          border: 1px solid #ffffff17;
          border-radius: 28px;
          background: linear-gradient(145deg, #171c32ed, #101a2ced);
          box-shadow: 0 30px 100px #00000045;
          animation: cardEnter 0.55s ease both;
        }

        .welcome {
          padding: clamp(28px, 6vw, 60px);
          text-align: center;
        }

        .hero-icon {
          position: relative;
          width: 110px;
          height: 110px;
          margin: 0 auto 26px;
          display: grid;
          place-items: center;
          border-radius: 32px;
          background: linear-gradient(145deg, #a78bfa22, #76f7cf16);
          border: 1px solid #ffffff17;
          transform: rotate(-5deg);
        }

        .brain-icon {
          font-size: 54px;
          transform: rotate(5deg);
          filter: drop-shadow(0 0 20px #76f7cf30);
        }

        .hero-orbit {
          position: absolute;
          border: 1px solid #76f7cf55;
          border-radius: 50%;
          pointer-events: none;
        }

        .orbit-one {
          inset: -10px;
          animation: orbitSpin 12s linear infinite;
        }

        .orbit-two {
          inset: -19px;
          border-color: #a78bfa33;
          animation: orbitSpin 18s linear infinite reverse;
        }

        .spark {
          position: absolute;
          color: var(--mint);
          font-size: 24px;
          animation: sparkle 2s ease-in-out infinite alternate;
        }

        .spark-one {
          top: -18px;
          right: -20px;
        }

        .spark-two {
          bottom: -12px;
          left: -23px;
          color: var(--purple);
          animation-delay: 0.7s;
        }

        .eyebrow {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          color: var(--mint);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2.6px;
        }

        .eyebrow-line {
          width: 25px;
          height: 1px;
          background: #76f7cf75;
        }

        .hero-title {
          margin: 22px 0 16px;
          font-size: clamp(37px, 7vw, 66px);
          line-height: 1.08;
          letter-spacing: -2.4px;
          font-weight: 950;
        }

        .hero-title span {
          color: var(--mint);
          text-shadow: 0 0 35px #76f7cf22;
        }

        .hero-description {
          max-width: 500px;
          margin: 0 auto;
          color: #aeb8d0;
          font-size: 14px;
          line-height: 1.9;
        }

        .game-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(18px, 5vw, 48px);
          margin: 34px 0;
          padding: 22px 12px;
          border-top: 1px solid #ffffff10;
          border-bottom: 1px solid #ffffff10;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .stat-icon {
          color: var(--purple);
          font-size: 21px;
        }

        .stat strong {
          font-size: 20px;
        }

        .stat > span:last-child {
          color: #8793b0;
          font-size: 9px;
          letter-spacing: 1.1px;
        }

        .stat-divider {
          width: 1px;
          height: 45px;
          background: #ffffff16;
        }

        .primary-button {
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 15px 24px;
          border: 0;
          border-radius: 13px;
          background: linear-gradient(110deg, #76f7cf, #a1ffe1);
          color: #10221f;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.1px;
          cursor: pointer;
          box-shadow: 0 8px 28px #76f7cf20;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }

        .primary-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 34px #76f7cf38;
        }

        .primary-button:active {
          transform: scale(0.98);
        }

        .start-button {
          width: min(100%, 320px);
        }

        .button-arrow {
          font-size: 19px;
          line-height: 1;
        }

        .welcome-note {
          margin-top: 20px;
          color: #75829e;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          line-height: 1.8;
        }

        .credits {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 30px;
          color: #8290ac;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .credits strong {
          color: var(--mint);
          font-size: 12px;
        }

        .credit-star {
          color: var(--purple);
        }

        .game-card {
          max-width: 760px;
          padding: clamp(10px, 4vw, 32px);
        }

        .game-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .left-eyebrow {
          justify-content: flex-start;
          font-size: 9px;
          gap: 8px;
        }

        .game-heading h2 {
          margin: 11px 0 0;
          font-size: clamp(25px, 5vw, 37px);
          letter-spacing: -1px;
        }

        .title-dot {
          color: var(--mint);
        }

        .round-counter {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        .round-counter > span {
          color: #8894b1;
          font-size: 9px;
          letter-spacing: 1.8px;
        }

        .round-counter strong {
          color: var(--mint);
          font-size: 24px;
        }

        .round-counter strong span {
          color: #7885a2;
          font-size: 12px;
        }

        .progress-track {
          height: 5px;
          margin: 25px 0 30px;
          overflow: hidden;
          border-radius: 10px;
          background: #ffffff12;
        }

        .progress-fill {
          height: 100%;
          border-radius: 10px;
          background: linear-gradient(90deg, #a78bfa, #76f7cf);
          box-shadow: 0 0 12px #76f7cf45;
          transition: width 0.4s ease;
        }

        .challenge-label {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #aab5ce;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.6px;
        }

        .challenge-dot {
          width: 6px;
          height: 6px;
          background: var(--purple);
          box-shadow: 0 0 10px #a78bfa88;
        }

        .puzzle-panel {
          margin-top: 15px;
          padding: clamp(15px, 3vw, 25px);
          border: 1px solid #ffffff14;
          border-radius: 20px;
          background:
            radial-gradient(ellipse at 50% 40%, #a78bfa0b, transparent 65%),
            #0b1020a8;
        }

        .puzzle-top,
        .puzzle-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: #8490ad;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.3px;
        }

        .letter-count {
          color: var(--purple);
        }

        .word-display {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(3px, 0.8vw, 8px);
          padding: 22px 0;
          overflow-wrap: anywhere;
        }

        .letter {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-width: 0;
          width: clamp(21px, 5.2vw, 39px);
          height: clamp(35px, 8vw, 51px);
          border: 1px solid #a78bfa48;
          border-radius: 8px;
          background: linear-gradient(145deg, #a78bfa19, #76f7cf08);
          color: #e9e6ff;
          font-size: clamp(16px, 3vw, 24px);
          font-weight: 900;
          box-shadow: 0 4px 12px #0000001c;
        }

        .word-revealed .letter {
          border-color: #76f7cf60;
          background: linear-gradient(145deg, #76f7cf20, #76f7cf08);
          color: var(--mint);
          animation: letterReveal 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .puzzle-bottom {
          justify-content: center;
          text-align: center;
          flex-wrap: wrap;
          color: #8793b0;
          line-height: 1.8;
        }

        .mini-spark {
          color: var(--mint);
        }

        .timer-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 18px;
          padding: 18px 20px;
          border: 1px solid #ffffff12;
          border-radius: 15px;
          background: #ffffff05;
          transition:
            border-color 0.3s,
            background 0.3s;
        }

        .timer-warning {
          border-color: #fb71854a;
          background: #fb71850a;
        }

        .timer-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .timer-icon {
          color: var(--purple);
          font-size: 28px;
        }

        .timer-info div {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .timer-info strong {
          font-size: 10px;
          letter-spacing: 1px;
        }

        .timer-info div span {
          color: #8d99b5;
          font-size: 11px;
          line-height: 1.5;
        }

        .timer-number {
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
          color: var(--mint);
          font-size: clamp(25px, 5vw, 35px);
          font-weight: 900;
          letter-spacing: -1px;
        }

        .timer-number span {
          color: #8793b0;
          padding: 0 2px;
        }

        .timer-warning .timer-number {
          color: #fb7185;
          animation: timerPulse 0.8s ease-in-out infinite alternate;
        }

        .waiting-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-top: 25px;
          color: #8b98b5;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.4px;
          text-align: center;
          line-height: 1.8;
        }

        .pulse-dot {
          animation: pulse 1.2s ease-in-out infinite;
        }

        .action-button {
          width: 100%;
          margin-top: 22px;
        }

        .meaning-panel {
          margin-top: 20px;
          padding: 18px 20px;
          border: 1px solid #76f7cf25;
          border-radius: 14px;
          background: #76f7cf08;
          animation: cardEnter 0.35s ease both;
        }

        .meaning-label {
          /* display: flex;
          align-items: center;
          gap: 8px; */
          text-align: center;
          color: white;
          font-size: 12px;
          letter-spacing: 1.5px;
        }

        .meaning-panel p {
          margin: 12px 0 0;
          color: #c1cbe0;
          font-size: 13px;
          line-height: 1.8;
        }

        .game-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 27px;
          padding-top: 18px;
          border-top: 1px solid #ffffff10;
          color: #75829e;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .game-footer strong {
          color: var(--mint);
        }

        .page-footer {
          width: 100%;
          max-width: 1120px;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 25px;
          padding-top: 15px;
          color: #6e7b98;
          font-size: 8px;
          letter-spacing: 1.1px;
          line-height: 1.8;
        }

        @keyframes letterReveal {
          0% {
            opacity: 0.15;
            transform: translateY(-18px) rotate(-10deg) scale(0.8);
          }
          65% {
            opacity: 1;
            transform: translateY(4px) rotate(3deg) scale(1.06);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0) scale(1);
          }
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes orbitSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sparkle {
          from {
            opacity: 0.45;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes pulse {
          50% {
            opacity: 0.35;
            transform: scale(0.75);
          }
        }

        @keyframes timerPulse {
          to {
            transform: scale(1.04);
          }
        }

        @media (max-width: 480px) {
          .game-page {
            padding: 16px 12px;
          }

          .topbar {
            align-items: flex-start;
            margin-bottom: 20px;
          }

          .brand {
            gap: 6px;
            font-size: 12px;
          }

          .brand-icon {
            font-size: 23px;
          }

          .presenter-badge {
            gap: 6px;
            padding: 9px;
            font-size: 8px;
            letter-spacing: 0.5px;
          }

          .welcome {
            padding: 34px 18px;
          }

          .game-stats {
            gap: 15px;
          }

          .stat strong {
            font-size: 17px;
          }

          .stat > span:last-child {
            font-size: 8px;
          }

          .game-card {
            padding: 21px 14px;
            border-radius: 20px;
          }

          .word-display {
            min-height: 125px;
            gap: 3px;
          }

          .letter {
            border-radius: 6px;
          }

          .timer-panel {
            padding: 14px 11px;
          }

          .timer-info {
            gap: 8px;
          }

          .timer-info strong {
            font-size: 9px;
          }

          .timer-info div span {
            font-size: 10px;
          }

          .timer-icon {
            font-size: 22px;
          }

          .timer-number {
            font-size: 25px;
          }

          .page-footer {
            justify-content: center;
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
}
