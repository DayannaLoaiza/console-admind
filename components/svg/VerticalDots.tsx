import { SVGProps } from "react";

type VerticalDotsStyles = {
  [key in DirectionType]: string;
};

type DirectionType = "horizontal" | "vertical";

export const VerticalDots = ({
  width = 24,
  height = 24,
  direction = "vertical",
  className = "",
}: SVGProps<SVGSVGElement> & { direction?: DirectionType }) => {
  const styles: VerticalDotsStyles = {
    horizontal: "rotate(270)",
    vertical: "rotate(180)",
  };

  const directionStyle = styles[direction];

  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height}
      width={width}
      role="presentation"
      viewBox="0 0 24 24"
      transform={directionStyle}
      className={`${className}`}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
