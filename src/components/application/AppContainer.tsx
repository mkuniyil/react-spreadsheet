import { AppTable } from "./AppTable";
import { SearchContainer } from "./SearchContainer";

export const AppContainer = () => {
  return (
    <>
      <div className="mt-8">
        <SearchContainer />
      </div>
      <div className="mt-8">
        <AppTable />
      </div>
    </>
  );
};
