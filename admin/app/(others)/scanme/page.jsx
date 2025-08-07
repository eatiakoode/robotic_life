import dynamic from "next/dynamic";
import ScanMe from "@/components/scanme";

export const metadata = {
  title: 'Scan Me || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <ScanMe />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
