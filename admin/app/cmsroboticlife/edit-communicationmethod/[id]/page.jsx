import EditCommunicationMethodClient from "./EditCommunicationMethodClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditCommunicationMethodClient id={params.id} />;
}
