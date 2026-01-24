// src/components/AccordionItem.tsx
import React, { useState, useRef, useEffect } from "react";

interface AccordionItemProps {
  title: string;
  description?: string; // Optional description for the collapsed state
  children: React.ReactNode; // Content to be shown when expanded
  text?: string; // Optional icon for the title
  isOpen?: boolean; // Prop to control initial open state
  onToggle: (title: string) => void; // Callback for when the item is toggled
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  description,
  children,
  text,
  isOpen = false,
  onToggle,
}) => {
  const [active, setActive] = useState(isOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(isOpen);
  }, [isOpen]);

  const toggleAccordion = () => {
    onToggle(title);
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex gap-x-5 items-center w-full p-4 text-left focus:outline-none"
        onClick={toggleAccordion}
        aria-expanded={active}
      >
        <div className=" w-[18px] h-[18px] rounded-full border-2 border-gray-600 flex justify-center items-center">
          {active && (
            <div className=" w-[10px] h-[10px] rounded-full bg-gray-600" />
          )}
        </div>
        <div className="flex justify-between flex-1 items-center">
          <span className=" text-gray-600 font-medium text-[15px]">{title}</span>
          <span className=" text-primary-100 font-semibold ">{text}</span>{" "}
          {/* Optional icon */}
        </div>
        {description && !active && (
          <span className="text-sm text-gray-500 ml-4">{description}</span>
        )}
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: active ? contentRef.current?.scrollHeight + "px" : "0px",
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="p-4 pt-0">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
