import { memo } from "react";

interface PageSizeProps {
  onChange: (val: number) => void;
  pageSize: number;
}

const PageSize = memo(({ onChange, pageSize }: PageSizeProps) => {

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      alignItems: "center"
    }}>
      <div>Page Size</div>
      <select onChange={(e) => onChange(parseInt(e.target.value))} defaultValue={pageSize}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>

  )
});

export default PageSize;