import EditMaterialClient from "./EditMaterialClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditMaterialClient id={params.id} />;
}
