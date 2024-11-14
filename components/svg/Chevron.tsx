import { SVGProps } from "react";

type ChevronStyles = {
  [key in DirectionType]: string;
};

type DirectionType = "right" | "left" | "down" | "up";

export const Chevron = ({
  width = 25,
  height = 25,
  direction = "down",
  className = "",
}: SVGProps<SVGSVGElement> & { direction?: DirectionType }) => {
  const styles: ChevronStyles = {
    right: "rotate(270)",
    left: "rotate(90)",
    down: "",
    up: "rotate(180)",
  };

  const directionStyle = styles[direction];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={directionStyle}
      className={`${className}`}
      style={{ filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25))" }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
};
