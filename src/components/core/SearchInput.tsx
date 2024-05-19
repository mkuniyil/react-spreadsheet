import debounce from "lodash.debounce";
import { ChangeEvent, FC, useMemo } from "react";
import { IoIosSearch } from "react-icons/io";

type SearchInputProps = {
  value: string;
  placeholder: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput: FC<SearchInputProps> = ({
  value,
  placeholder,
  onSearch,
}) => {
  const onSearchDebounced = useMemo(() => debounce(onSearch, 100), [onSearch]);

  return (
    <div className="relative w-full text-gray-400 focus-within:text-gray-600 border shadow rounded-md">
      <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
        <IoIosSearch />
      </div>
      <input
        data-testid="searchInput"
        defaultValue={value}
        placeholder={placeholder}
        onChange={onSearchDebounced}
        className="rounded border-2 block w-full h-12 pl-9 py-4 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
      />
    </div>
  );
};
