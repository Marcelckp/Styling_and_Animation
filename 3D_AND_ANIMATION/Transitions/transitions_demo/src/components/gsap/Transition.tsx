"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { animatePageOut } from "./animations/animations";

export const TransitionGSAP = ({ children }: { children: React.ReactNode }) => {
  console.log("transition is in ", children);

  const [displayChildren, setDisplayChildren] = React.useState(children); // This initially holds the first children passed into it

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDisplayChildren(children);
//     }, 5000);

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [children]);

  return <div>{displayChildren}</div>;
};

export const TransitionLink = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href, router);
  };

  return (
    <button
      className="border-[1px] border-black p-4 rounded-xl hover:bg-black hover:text-neutral-100 cursor-pointer"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
