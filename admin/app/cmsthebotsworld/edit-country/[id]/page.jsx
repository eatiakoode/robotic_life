import EditCountryClient from "./EditCountryClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditCountryClient id={params.id} />;
}
