const ScrollArea = ({ children, className }) => (
  <div
    style={{ overflowY: "auto", height: "calc(100vh - 180px)" }}
    className={className}
  >
    {children}
  </div>
);
export default ScrollArea;
