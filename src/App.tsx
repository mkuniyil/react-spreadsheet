import { AppProvider } from "./AppProvider";
import { PageLayout } from "./components/application/PageLayout";

function App() {
  return (
    <AppProvider>
      <PageLayout />
    </AppProvider>
  );
}

export default App;
