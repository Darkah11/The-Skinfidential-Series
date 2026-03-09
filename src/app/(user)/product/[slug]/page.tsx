// import Container from "@/components/Container";
import ProductDetails from "@/components/ProductDetails";
import { getProductBySlug } from "@/utils/firebase";
import ConsultUs from "@/components/ConsultUs";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return <div>no product available</div>;
  }
  return (
    <>
      <ProductDetails product={product} />
      <section>
        <ConsultUs />
      </section>
    </>
  );
}
