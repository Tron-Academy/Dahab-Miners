const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "#1ECBAF",
  speed = "6s",
  children,
  ...rest
}) => {
  return (
    <Component
      className={`relative inline-block py-[8px] overflow-hidden border-[0.1px] border-[#26ddff] rounded-[20px] ${className}`}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="relative z-1 bg-[#000618] text-white text-center text-[16px] py-[16px] px-[15px] rounded-[20px]">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;