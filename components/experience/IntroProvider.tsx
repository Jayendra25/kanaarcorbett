"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { IntroSequence } from "@/components/experience/IntroSequence";

type IntroContextValue = {
  introDone: boolean;
  replayIntro: () => void;
};

const IntroContext = createContext<IntroContextValue>({
  introDone: true,
  replayIntro: () => {},
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro === "skip" || window.__kanaarIntroMode === "skip") {
      document.body.classList.remove("intro-lock");
      setVisible(false);
      setIntroDone(true);
      html.dataset.intro = "done";
      return;
    }

    document.body.classList.add("intro-lock");
    return () => document.body.classList.remove("intro-lock");
  }, []);

  const reveal = useCallback(() => {
    setIntroDone(true);
    document.body.classList.remove("intro-lock");
  }, []);

  const finish = useCallback(() => {
    setVisible(false);
    document.documentElement.dataset.intro = "done";
    try {
      sessionStorage.setItem("kanaar-intro", "1");
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  const replayIntro = useCallback(() => {
    try {
      sessionStorage.removeItem("kanaar-intro");
      sessionStorage.removeItem("kanaar-intro-seen");
    } catch {
      /* storage may be unavailable */
    }
    window.location.hash = "";
    window.location.reload();
  }, []);

  const value = useMemo(
    () => ({ introDone, replayIntro }),
    [introDone, replayIntro],
  );

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={value}>
        {visible ? <IntroSequence onReveal={reveal} onDone={finish} /> : null}
        {children}
      </IntroContext.Provider>
    </MotionConfig>
  );
}