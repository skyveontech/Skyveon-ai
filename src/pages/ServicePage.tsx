import { useParams } from "react-router-dom";

import { services } from "@/data/services";

import ServiceHero from "@/components/sections/service/ServiceHero";
import ServiceOverview from "@/components/sections/service/ServiceOverview";
import ServiceCapabilitiesTech from "@/components/sections/service/ServiceCapabilitiesTech";
// import ServiceTechStack from "@/components/sections/service/ServiceTechStack";
import ServiceProcess from "@/components/sections/service/ServiceProcess";
// import ServiceBenefits from "@/components/sections/service/ServiceBenefits";
import ServiceCTA from "@/components/sections/service/ServiceCTA";

export default function ServicePage() {
  const { slug } = useParams();

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return (
      <div className="pt-40">
        Service Not Found
      </div>
    );
  }

  return (
    <>
      <ServiceHero service={service} />

       <ServiceOverview service={service} />

   <ServiceCapabilitiesTech service={service} />

      {/* <ServiceTechStack service={service} /> */}

         <ServiceProcess service={service} />

   {/*   <ServiceBenefits service={service} />*/}

      <ServiceCTA  /> 
    </>
  );
}