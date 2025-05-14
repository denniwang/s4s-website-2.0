"use client";
import { useState, useEffect, useRef, useMemo } from "react";

interface ScrollingTextProps {
  options: string[];
  delay?: number;
  className?: string;
}

export const ScrollingText = ({
  options,
  delay = 2000,
  className = "",
}: ScrollingTextProps) => {
  // Memoize options array to prevent unnecessary re-renders
  const validOptions = useMemo(() => {
    // Safety check for empty options
    if (!options.length) return [];
    if (options.length === 1) return options;
    return options;
  }, [options]);

  // Early return for empty or single options
  if (!validOptions.length) {
    return <span className={className}></span>;
  }

  if (validOptions.length === 1) {
    return <span className={className}>{validOptions[0]}</span>;
  }

  // Only create the items array once on component mount
  const items = useMemo(
    () => [...validOptions, validOptions[0]],
    [validOptions]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find the longest option to set minimum width - memoized to avoid recalculation
  const longestOption = useMemo(
    () =>
      validOptions.reduce(
        (longest, current) =>
          current.length > longest.length ? current : longest,
        ""
      ),
    [validOptions]
  );

  // Memoize the container style to prevent recreation on each render
  const containerStyle = useMemo(
    () => ({
      minWidth: `${longestOption.length * 0.6}em`,
      height: "1.5em",
      verticalAlign: "bottom",
    }),
    [longestOption]
  );

  useEffect(() => {
    // Prevent any animation if there's only 0-1 options
    if (validOptions.length <= 1) return;

    const startAnimation = () => {
      // Clear existing timeout to prevent memory leaks
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set timeout for the first part of the animation cycle
      timeoutRef.current = setTimeout(
        () => {
          // If we've reached the duplicate item (end of list)
          if (currentIndex === items.length - 2) {
            // Quick reset to first item without animation by using a zero-duration transition
            const element = containerRef.current
              ?.firstElementChild as HTMLElement;
            if (element) {
              // Temporarily remove transition to instantly jump back to first position
              element.style.transition = "none";
              setCurrentIndex(0);

              // Force a reflow to ensure the style change takes effect immediately
              void element.offsetWidth;

              // Restore the transition after the browser has processed the style change
              requestAnimationFrame(() => {
                if (element) {
                  element.style.transition = "transform 500ms ease-in-out";
                }
              });
            }
          } else {
            // Move to next item
            setCurrentIndex((prev) => prev + 1);
          }

          // Schedule next animation
          timeoutRef.current = setTimeout(startAnimation, delay);
        },
        currentIndex === 0 ? delay : 500 + delay
      );
    };

    // Start the animation cycle
    startAnimation();

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, delay, items.length, validOptions.length]);

  return (
    <div
      ref={containerRef}
      className={`inline-block relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      <div
        className="transition-transform duration-500 ease-in-out will-change-transform"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          height: "100%",
          width: "100%",
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="absolute top-0 left-0 w-full h-full flex items-center"
            style={{ top: `${index * 100}%` }}
            aria-hidden={index !== currentIndex}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
