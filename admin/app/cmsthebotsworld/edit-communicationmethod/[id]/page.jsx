import EditCommunicationMethodClient from "./EditCommunicationMethodClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditCommunicationMethodClient id={params.id} />;
}
