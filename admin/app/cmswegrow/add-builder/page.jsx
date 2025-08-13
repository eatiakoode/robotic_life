// "use client"; // ✅ Marks this page as a Client Component

// import AddBuilder from "@/components/dashboard/add-builder";
import AddBuilderWrapper from "./AddBuilderWrapper";

export const metadata = {
  title: 'My Properties || WeGrow',
  description: 'WeGrow',
};

export default function Page() {
  return <AddBuilderWrapper />;
}
