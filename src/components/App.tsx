import Sidebar from "components/Layout/Sidebar"
import PageLayout from "components/Layout/PageLayout"
import MainContent from "components/Layout/MainContent"
import Result from "components/Result"
import { SettingsContextProvider } from "contexts/settings"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();

function App() {
  return (
    <PageLayout>
      <Sidebar />
      <MainContent>
        <Result />
      </MainContent>
    </PageLayout>
  )
}

function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </QueryClientProvider>
  )
}

export default WrappedApp;
