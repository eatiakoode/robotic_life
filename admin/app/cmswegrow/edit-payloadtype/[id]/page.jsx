import EditPayloadTypeClient from "./EditPayloadTypeClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditPayloadTypeClient id={params.id} />;
}
