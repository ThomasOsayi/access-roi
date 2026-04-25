const DEFAULT_ITEMS = [
    "Options over Obligations",
    "Assets over Liabilities",
    "Math over Mascots",
    "Data over Debt",
  ];
  
  type TickerProps = {
    items?: string[];
  };
  
  export default function Ticker({ items = DEFAULT_ITEMS }: TickerProps) {
    // Duplicate the items so the scroll animation loops seamlessly
    const loopedItems = [...items, ...items];
  
    return (
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {loopedItems.map((item, i) => {
            const [before, , after] = item.split(/\s(over|vs|—)\s/);
            const connector = item.match(/\s(over|vs|—)\s/)?.[1];
  
            return (
              <span key={i} className="ticker-item">
                {before} <span className="italic">{connector}</span> {after}
              </span>
            );
          })}
        </div>
      </div>
    );
  }