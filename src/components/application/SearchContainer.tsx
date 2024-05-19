import { useState } from "react";
import { SearchInput } from "../core/SearchInput";

export const SearchContainer = () => {
  const [searchStr, setSearchStr] = useState("");

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(event.target.value);
  };

  return (
    <SearchInput
      value={searchStr}
      placeholder="Type a search query to filter"
      onSearch={onSearch}
    />
  );
};
