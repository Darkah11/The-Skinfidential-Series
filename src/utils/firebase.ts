import { Category, Product } from "@/types/products";
import { db, storage } from "../config/firebase";
import {
  addDoc,
  collection,
  // deleteDoc,
  // doc,
  // getDoc,
  getDocs,
  // limit,
  // orderBy,
  // query,
  // updateDoc,
  // where,
} from "firebase/firestore";
// import { redirect } from "next/navigation";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { log } from "console";

const slugify = (title: string) => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove non-alphanumeric characters (except spaces and hyphens)
    .replace(/[\s_-]+/g, "-") // Replace spaces and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export const addProduct = async (body: Product) => {
  if (!body.image) return alert("Please select an image");

  try {
    // setLoading(true);

    // 1️⃣ Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", body.image);
    formData.append("upload_preset", "unsigned_preset"); // your unsigned preset
    formData.append("folder", "products");

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const cloudinaryData = await cloudinaryRes.json();
    const imageUrl = cloudinaryData.secure_url;
    if (!imageUrl) throw new Error("Cloudinary upload failed");
    const productDataToSave = {
      name: body.name,
      description: body.description,
      slug: slugify(body.name),
      price: Number(body.price),
      stock: Number(body.stock),
      categories: body.categories,
      tags: body.tags,
      imageUrl: imageUrl,
      createdAt: new Date().toISOString(),
    };

    // 2️⃣ Save product details + image URL to Firestore
    await addDoc(collection(db, "products"), productDataToSave);

    alert("✅ Product added successfully!");
  } catch (err) {
    console.error(err);
    alert("Error uploading product");
  } finally {
    console.log("all done");
  }
};

export const getCategories = async () => {
  const categoriesCollection = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesCollection);
  const categoriesList = categoriesSnapshot.docs.map((doc) => ({
    ...(doc.data() as Category),
    id: doc.id,
  }));
  return categoriesList;
};

export async function getProducts() {
  try {
    const snapshot = await getDocs(collection(db, "products"));

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Product),
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
