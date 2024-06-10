"use client"

import TRANSCRIPT from "../data/transcript.json";
import AUDIO from "../data/audio.wav";
import { useRef, useState } from "react";

export interface Message {
  content: string;
  role: "agent" | "user";
  start: number;
  end: number;
}

export default function HomePage() {

  const [progress, setProgress] = useState<number>(0)

  const audio = useRef<HTMLAudioElement>(null)

  function handleClick(time: number) {

    audio.current!.currentTime = time;

    audio.current?.play()

  }

  function handleTimeChange(time: number) {

    const match = TRANSCRIPT.findLast(message => message.start < progress)

    setProgress(time)

    document.getElementById(String(match?.start))?.scrollIntoView({

      behavior: "smooth",
      block: 'center'

    })

  }

  return (
    <section className="grid gap-4">
      <div className="grid gap-4">
        {TRANSCRIPT.map(({start, content, role}) => (
          <button
            id={String(start)}
            type="button"
            onClick={() => handleClick(start)}
            className={`rounded p-4 max-w-[90%] text-left ${role === "user" ? "justify-self-end bg-neutral-700" : "bg-neutral-800"} ${progress < start ? 'opacity-50' : 'opacity-100'}`}
            key={start}
          >
            {content}
          </button>
        ))}
      </div>

      <audio ref={audio} className="w-full sticky bottom-4" src={AUDIO} controls onTimeUpdate={event => handleTimeChange(audio.current!.currentTime)}/>

    </section>
  );
}
