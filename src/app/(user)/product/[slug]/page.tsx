// import Container from "@/components/Container";
import { GoldButton } from "@/components/Button";
import Container from "@/components/Container";
import ProductDetails from "@/components/ProductDetails";
import { getProductBySlug } from "@/utils/firebase";
import Image from "next/image";
import consultUs from "../../../../../public/consult-us.jpg";

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
        <Container className="  relative  text-white bg-primary-50">
          <div className=" md:flex ">
            <Image
              src={consultUs}
              alt=" image of a skincare product"
              className=" order-2 w-full max-h-[450px] md:w-1/2 md:max-h-[400px] object-cover"
            />
            <div className=" order-1 px-3 py-5 md:w-1/2 flex justify-center md:px-8">
              <div className=" max-w-[500px] m-auto  md:text-right">
                <h3 className=" text-gold text-2xl lg:text-4xl font-semibold">
                  Need Help?
                </h3>
                <p className=" text-sm mt-2 lg:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem consequuntur ea quibusdam? Commodi nesciunt
                  libero dignissimos id consequatur ab fuga maxime eaque atque
                  alias possimus officia explicabo ipsam quas et, reiciendis,
                  velit magnam odio, rem itaque. Voluptatibus vero rerum quo.
                </p>
                <GoldButton
                  text="Consult Us"
                  style=" bg-gold mt-5 text-primary-100"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
