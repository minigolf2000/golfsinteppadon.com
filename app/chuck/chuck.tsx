"use client";

import React, { useRef } from "react";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Chuck() {
  const [facts, setFacts] = useState([]);
  const [selectedFactIndex, setSelectedFactIndex] = useState(0);
  useEffect(() => {
    fetch("/chuck.csv").then(async (resp) => {
      setFacts((await resp.text()).split("\n"));
    });
  }, []);

  function randomizeFacts() {
    setSelectedFactIndex(Math.floor(Math.random() * facts.length));
  }
  useLayoutEffect(randomizeFacts, [facts]);

  const [name, setName] = useState("Chuck Norris");

  const sizerRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    setWidth(sizerRef.current?.offsetWidth || 164);
  }, [name]);

  function withNameInputs(fact?: string) {
    if (!fact) {
      return null;
    }

    const parts = fact.split(/Chuck Norris/);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && (
          <input
            type="text"
            value={name}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            placeholder="Your name"
            style={{ width }}
            className="underline decoration-dotted decoration-slate-400 hover:outline outline-1 outline-slate-400 rounded"
          />
        )}
      </React.Fragment>
    ));
  }

  return (
    <>
      <h1>
        <a href="/">Golf Sinteppadon</a>
      </h1>

      <div
        className="underline decoration-dotted decoration-slate-200 decoration-2 underline-offset-4 cursor-pointer mx-auto my-8 max-w-2xl text-3xl leading-relaxed hover:decoration-slate-300 hover:decoration-solid"
        onClick={randomizeFacts}
      >
        {withNameInputs(facts[selectedFactIndex])}
      </div>

      <span ref={sizerRef}>
        <span className="text-3xl invisible">{name}</span>
      </span>
    </>
  );
}
