import MainLayout from "./LayOuts/Main/MainLayout";
import { Outlet } from "react-router";

function App() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-background text-foreground'>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}

export default App;
