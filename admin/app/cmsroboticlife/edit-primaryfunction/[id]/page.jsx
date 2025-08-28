import EditPrimaryFunctionClient from "./EditPrimaryFunctionClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditPrimaryFunctionClient id={params.id} />;
}
