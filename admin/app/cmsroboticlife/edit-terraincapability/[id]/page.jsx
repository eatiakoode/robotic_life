import EditTerrainCapabilityClient from "./EditTerrainCapability";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditTerrainCapabilityClient id={params.id} />;
}
