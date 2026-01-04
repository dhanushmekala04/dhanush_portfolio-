"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    points?: string[];
    tech?: { name: string; svg?: string }[];
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gray-100 dark:bg-gray-700/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <p className="mt-4 text-muted-foreground tracking-wide leading-relaxed text-sm">
              {item.description}
            </p>
            {item.tech && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.tech.slice(0, 6).map((techItem) =>
                  techItem.svg ? (
                    <img
                      key={techItem.name}
                      src={techItem.svg}
                      alt={techItem.name}
                      className="w-5 h-5 rounded-sm"
                    />
                  ) : (
                    <span
                      key={techItem.name}
                      className="text-xs font-medium inline-block py-0.5 px-2 leading-none text-center whitespace-nowrap align-baseline rounded-md bg-primary/10 text-primary"
                    >
                      {techItem.name}
                    </span>
                  )
                )}
                {item.tech.length > 6 && (
                  <span className="text-xs font-medium inline-block py-0.5 px-2 leading-none text-center whitespace-nowrap align-baseline rounded-md bg-muted text-muted-foreground">
                    +{item.tech.length - 6}
                  </span>
                )}
              </div>
            )}
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white border border-gray-200 group-hover:border-gray-300 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "w-full text-left text-lg sm:text-xl md:text-2xl font-medium tracking-tighter text-pretty bg-clip-text text-transparent bg-gradient-to-br from-primary via-foreground to-foreground",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-black tracking-wide leading-relaxed text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}; 