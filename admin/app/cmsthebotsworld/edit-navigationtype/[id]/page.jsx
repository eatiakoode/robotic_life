import EditNavigationTypeClient from "./EditNavigationTypeClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditNavigationTypeClient id={params.id} />;
}
