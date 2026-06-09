import { useParams } from "react-router-dom";
import ServicePage from "./ServicePage";

export default function ServicePageWrapper() {
  const { slug } = useParams();

  return <ServicePage key={slug} />;
}