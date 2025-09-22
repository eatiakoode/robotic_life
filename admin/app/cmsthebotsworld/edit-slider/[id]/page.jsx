import ClientPage from "./EditSliderClient";

export const metadata = {
  title: "My Robots || TheBotsWorld",
  description: "TheBotsWorld",
};

export default function Page({ params }) {
  // params.id is available here
  return <ClientPage id={params.id} />;
}
