"use client";

import { useIntro } from "@/components/experience/IntroProvider";

export function ReplayIntro() {
  const { replayIntro } = useIntro();
  return (
    <button type="button" className="footer__replay" onClick={replayIntro}>
      Replay introduction
    </button>
  );
}