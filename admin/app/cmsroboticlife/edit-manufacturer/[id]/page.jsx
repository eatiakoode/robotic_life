import ClientPage from "./EditManufacturerCient";

export const metadata = {
  title: "My Robots || RoboticLife",
  description: "RoboticLife",
};

export default function Page({ params }) {
  // params.id is available here
  return <ClientPage id={params.id} />;
}
