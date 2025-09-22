import EditColorClient from "./EditColorClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditColorClient id={params.id} />;
}
