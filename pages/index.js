import { groq } from "next-sanity";
import { usePreviewSubscription } from "../lib/sanity";
import { getClient } from "../lib/sanity.server";

import Hero from "./components/Hero";
import LogoCloud from "./components/LogoCloud";
import CTAServices from "./components/CTAServices";
import CTAGallery from "./components/CTAGallery";
import Testimonials from "./components/Testimonials";
import FindUs from "./components/FindUs";


const websiteQuery = groq`*[_type == "website" && title == 'Vicious Streak Salon'][0] {
  title,
  description,
  'image':image.asset->url,
  'businessDays':businessHourList[]->{_id, day, hour},
  logos
}`;

const testimonialQuery = groq`*[_type == "testimonials"]`;

export default function Home({ data, preview }) {
  const { data: website } = usePreviewSubscription(websiteQuery, {
    initialData: data.website,
    enabled: preview,
  });

  const { data: testimonials } = usePreviewSubscription(testimonialQuery, {
    initialData: data.testimonials,
    enabled: preview,
  });

  const { title, description, image, businessDays, logos } = website;

  return (
    <>
      <Hero title={title} description={description} image={image} />
      <LogoCloud logos={logos} />
      <CTAGallery />
      <CTAServices />
      <Testimonials testimonials={testimonials} />
      {/* <FindUs /> */}
    </>
  );
}

export async function getServerSideProps({ preview = true }) {
  const website = await getClient(preview).fetch(websiteQuery);
  const testimonials = await getClient(preview).fetch(testimonialQuery);

  return {
    props: {
      preview,
      data: { website, testimonials },
    },
  };
}
