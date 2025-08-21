import EditCountryClient from "./EditCountryClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditCountryClient id={params.id} />;
}
