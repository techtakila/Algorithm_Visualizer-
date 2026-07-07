const Bar = ({ value, index, active, found, chosen, compare, swap, onClick }) => {
  return (
    <div className="bar-wrapper cursor-pointer select-none" onClick={() => onClick && onClick(index)}>
      <div
        className={`bar ${active ? "active" : ""} ${compare ? "compare" : ""} ${swap ? "swap" : ""} ${found ? "found" : ""} ${
          chosen ? "chosen" : ""
        }`}
        style={{ height: value }}
      />
      <span className={`bar-label ${chosen ? "font-semibold text-emerald-300" : ""}`}>{value}</span>
    </div>
  );
};
export default Bar;