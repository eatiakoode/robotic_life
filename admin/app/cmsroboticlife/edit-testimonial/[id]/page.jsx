import EditTestimonialClient from "./EditTestimonialClient";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description: 'WeGrow - Real Estate',
};

export default function Page({ params }) {
  return <EditTestimonialClient id={params.id} />;
}
