"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  unit?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, unit, ...props }, ref) => {
  const [values, setValues] = React.useState(props.defaultValue);

  return (
    <div className="relative w-full pt-7 pb-1">
      {/* Value labels above thumbs */}
      <div className="absolute top-0 left-0 right-0 flex justify-between">
        <div className="text-sm font-medium text-primary">
          {values?.[0]} {unit}
        </div>
        <div className="text-sm font-medium text-primary">
          {values?.[1]} {unit}
        </div>
      </div>

      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
        onValueChange={setValues}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-slate-200">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
        </SliderPrimitive.Track>
        {Array.from({ length: props.defaultValue?.length || 1 }).map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-4 w-4 rounded-full border border-primary bg-background shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
