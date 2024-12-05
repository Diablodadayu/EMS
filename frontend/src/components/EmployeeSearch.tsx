import { Input } from "antd";
export const EmployeeSearch = ({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (query: string) => void;
}) => {
  return (
    <div>
      <Input
        value={query}
        onChange={(e) => {
          onQueryChange(e.target.value);
        }}
      />
    </div>
  );
};
