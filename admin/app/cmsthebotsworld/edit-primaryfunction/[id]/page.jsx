import EditPrimaryFunctionClient from "./EditPrimaryFunctionClient";

export const metadata = {
  title: 'Robots || TheBotsWorld',
  description: 'TheBotsWorld',
};

export default function Page({ params }) {
  return <EditPrimaryFunctionClient id={params.id} />;
}
