import dynamic from "next/dynamic";
import AdminLogin from "@/components/adminlogin";

export const metadata = {
  title: 'Login || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AdminLogin />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
