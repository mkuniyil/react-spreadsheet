import { Header } from "../core/Header";
import { AppContainer } from "./AppContainer";

export const PageLayout = () => (
  <>
    <Header>
      <div className="flex mx-auto">
        <h2
          className="text-2xl font-bold text-gray-900 px-4"
          data-testid="appHeader"
        >
          Your Personal Staking Calculator
        </h2>
      </div>
    </Header>
    <div className="px-4 mx-auto  pb-14">
      <AppContainer />
    </div>
  </>
);
