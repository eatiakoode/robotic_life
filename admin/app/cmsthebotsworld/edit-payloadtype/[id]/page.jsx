import EditPayloadTypeClient from "./EditPayloadTypeClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditPayloadTypeClient id={params.id} />;
}
