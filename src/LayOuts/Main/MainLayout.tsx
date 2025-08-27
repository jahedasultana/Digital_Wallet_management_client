import Footer from "@/components/Layouts/Footer/Footer";
import Navbar from "@/components/Layouts/Navbar/Navbar";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Navbar />
      <div className='grow-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
