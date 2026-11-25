import type { Metadata } from "next";
import {
  generateProductLegalMetadata,
  ProductLegalPage,
} from "@/app/product-legal";

export const runtime = "nodejs";
export const revalidate = 60;

type Props = { params: Promise<{ productSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  return generateProductLegalMetadata(productSlug, "terms");
}

export default async function ProductTermsPage({ params }: Props) {
  const { productSlug } = await params;
  return <ProductLegalPage productSlug={productSlug} kind="terms" />;
}
