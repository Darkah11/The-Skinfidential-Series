import ContactPage from "@/components/ContactForm";
import Container from "@/components/Container";
import React from "react";

export default function page() {
  return (
    <Container className=" relative px-5 lg:px-12 xl:px-24 py-16 ">
      <ContactPage />
    </Container>
  );
}
