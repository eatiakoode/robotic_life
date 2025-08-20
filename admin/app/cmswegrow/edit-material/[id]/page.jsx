import EditMaterialClient from "./EditMaterialClient";

export const metadata = {
  title: 'Robots || RoboticLife',
  description: 'RoboticLife',
};

export default function Page({ params }) {
  return <EditMaterialClient id={params.id} />;
}
