"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  openPage?: number; // 1-based page to open to (default 1)
};

export default function BrochureViewer({ images, openPage = 1 }: Props) {
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const [currentPair, setCurrentPair] = useState<number>(Math.floor((openPage - 1) / 2));
  const [flipped, setFlipped] = useState<boolean[]>(() => {
    const initialFlipped = Array(images.length).fill(false);
    if (openPage > 1) {
      // flip pairs up to openPage-1
      for (let i = 0; i < images.length; i++) {
        const pageNum = i + 1;
        if (pageNum < openPage) initialFlipped[i] = true;
      }
      // ensure pages open as pairs (both pages in a spread match)
      for (let i = 0; i < images.length; i += 2) {
        if (initialFlipped[i] || initialFlipped[i + 1]) {
          initialFlipped[i] = true;
          if (i + 1 < images.length) initialFlipped[i + 1] = true;
        }
      }
    }
    return initialFlipped;
  });

  useLayoutEffect(() => {
    // initialize zIndex stacking like the original script
    const pages = pagesRef.current?.getElementsByClassName("page");
    if (!pages) return;
    for (let i = 0; i < pages.length; i++) {
      const el = pages[i] as HTMLElement;
      el.style.zIndex = String(pages.length - i);
    }
  }, [images.length]);

  const togglePair = (pairStart: number) => {
    setFlipped((prev) => {
      const next = prev.slice();
      const currentlyOpen = !!next[pairStart];
      next[pairStart] = !currentlyOpen;
      if (pairStart + 1 < next.length) next[pairStart + 1] = !currentlyOpen;
      return next;
    });
    setCurrentPair(pairStart / 2);
  };

  const handleClick = (index: number) => {
    const pairStart = index % 2 === 0 ? index : index - 1;
    togglePair(pairStart);
  };

  const goNext = () => {
    const nextPair = Math.min(currentPair + 1, Math.floor((images.length - 1) / 2));
    const pairStart = nextPair * 2;
    togglePair(pairStart);
  };

  const goPrev = () => {
    const prevPair = Math.max(currentPair - 1, 0);
    const pairStart = prevPair * 2;
    togglePair(pairStart);
  };

  return (
    <div className="book" style={{ perspective: "250vw" }}>
      <style>{`
        .book { transition: opacity 0.4s 0.2s; }
        .pages { width: min(900px, 90vw); aspect-ratio: 2 / 1.4; height: auto; position: relative; transform-style: preserve-3d; backface-visibility: hidden; border-radius: 4px; margin: 0 auto; }
        .page { position: absolute; top: 0; width: 50%; height: 100%; transform-origin: 0 0; transition: transform 1.0s; backface-visibility: hidden; transform-style: preserve-3d; cursor: pointer; user-select: none; }
        .page:nth-child(odd) { transform: rotateY(0deg); right: 0; border-radius: 0 4px 4px 0; background-image: linear-gradient(to right, rgba(0,0,0,.15) 0%, rgba(0,0,0,0) 10%); }
        .page:nth-child(even) { transform: rotateY(180deg); transform-origin: 100% 0; left: 0; border-radius: 4px 0 0 4px; background-image: linear-gradient(to left, rgba(0,0,0,.12) 0%, rgba(0,0,0,0) 10%); }
        .page img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .page.flipped:nth-child(odd) { transform: rotateY(-180deg); }
        .page.flipped:nth-child(even) { transform: rotateY(0deg); }
        .controls { display:flex; justify-content:center; gap:12px; align-items:center; margin:12px 0; }
        .controls button { background:#000; color:#fff; padding:8px 12px; border-radius:4px; }
        .page-indicator { color: #fff; font-size: 0.95rem; }
      `}</style>

      <div className="controls">
        <button type="button" onClick={goPrev} aria-label="Previous">Prev</button>
        <div className="page-indicator">Page {Math.min(currentPair * 2 + 1, images.length)} - {Math.min(currentPair * 2 + 2, images.length)} of {images.length}</div>
        <button type="button" onClick={goNext} aria-label="Next">Next</button>
      </div>

      <div id="pages" className="pages" ref={pagesRef}>
        {images.map((src, i) => (
          <div
            key={i}
            className={`page ${flipped[i] ? "flipped" : ""}`}
            onClick={() => handleClick(i)}
            style={{ zIndex: images.length - i, ...(i % 2 === 0 ? { right: 0 } : { left: 0 }) } as React.CSSProperties}
            aria-hidden={false}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src={src} alt={`page-${i + 1}`} fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
