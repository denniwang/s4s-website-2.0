"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

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

  // Always create the items array (will only be used if we have multiple items)
  const items = useMemo(
    () => validOptions.length > 1 ? [...validOptions, validOptions[0]] : validOptions,
    [validOptions]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionRef = useRef<NodeJS.Timeout | null>(null);

  // Measure width of a specific item
  const measureItemWidth = useCallback((index: number): number => {
    const item = itemsRef.current[index];
    return item ? item.scrollWidth + 10 : 0; // Added extra padding for better appearance
  }, []);

  // Effect to initialize measurements
  useEffect(() => {
    if (validOptions.length <= 1) return;
    
    // Initialize refs array
    itemsRef.current = itemsRef.current.slice(0, items.length);

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      const width = measureItemWidth(currentIndex);
      setCurrentWidth(width);
    }, 50);

    return () => {
      clearTimeout(initTimeout);
    };
  }, [items.length, currentIndex, measureItemWidth, validOptions.length]);

  useEffect(() => {
    // Prevent any animation if there's only 0-1 options
    if (validOptions.length <= 1) return;

    const startAnimation = () => {
      // Clear existing timeout to prevent memory leaks
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (transitionRef.current) {
        clearTimeout(transitionRef.current);
      }

      // Set timeout for the animation cycle
      timeoutRef.current = setTimeout(() => {
        // Determine next index
        const nextIndex =
          currentIndex === items.length - 2 ? 0 : currentIndex + 1;

        // Measure the next item's width before transitioning
        const nextWidth = measureItemWidth(nextIndex);

        // Start transition
        setIsTransitioning(true);

        // Update width to next item's width
        setCurrentWidth(nextWidth);

        // If we've reached the duplicate item (end of list)
        if (currentIndex === items.length - 2) {
          // Quick reset to first item without animation
          const element = containerRef.current
            ?.firstElementChild as HTMLElement;
          if (element) {
            // Temporarily remove transition to instantly jump back to first position
            element.style.transition = "none";
            setCurrentIndex(0);

            // Force a reflow to ensure the style change takes effect immediately
            void element.offsetWidth;

            // Restore the transition after browser has processed the change
            requestAnimationFrame(() => {
              if (element) {
                element.style.transition = "transform 500ms ease-in-out";
              }
            });
          }
        } else {
          // Move to next item
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }

        // After animation completes, allow new measurements
        transitionRef.current = setTimeout(() => {
          setIsTransitioning(false);

          // Schedule next animation
          startAnimation();
        }, 500); // This should match the CSS transition duration
      }, delay);
    };

    // Start the animation cycle
    startAnimation();

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (transitionRef.current) {
        clearTimeout(transitionRef.current);
      }
    };
  }, [
    currentIndex,
    delay,
    items.length,
    validOptions.length,
    measureItemWidth,
  ]);

  // Handle window resize events to recalculate widths
  useEffect(() => {
    if (validOptions.length <= 1) return;
    
    const handleResize = () => {
      if (!isTransitioning) {
        const width = measureItemWidth(currentIndex);
        setCurrentWidth(width);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex, isTransitioning, measureItemWidth, validOptions.length]);

  // Render appropriate content based on options length
  if (!validOptions.length) {
    return <span className={className}></span>;
  }

  if (validOptions.length === 1) {
    return <span className={className}>{validOptions[0]}</span>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden transition-all duration-500 ease-in-out flex items-center justify-center ${className}`} // Removed `inline-block` and used `flex` for centering
      style={{
        height: "1.5em",
        width: currentWidth > 0 ? `${currentWidth}px` : "auto",
        verticalAlign: "bottom",
        paddingBottom:"5px",
        willChange: "width",
      }}
    >
      <div
        className="transition-transform duration-500 ease-in-out will-change-transform w-full flex justify-center"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          height: "100%",
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="absolute h-full flex items-center justify-center whitespace-nowrap pt-1 mx-auto"
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
