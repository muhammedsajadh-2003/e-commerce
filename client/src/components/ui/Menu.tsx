import React from "react";

export const Menu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`bg-white border rounded-md shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const MenuItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
