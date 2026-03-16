import {
  Category,
  CategoryWithId,
  Product,
  ProductWithId,
} from "@/types/products";
import { db, messaging } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  // deleteDoc,
  // doc,
  // getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  // limit,
  // orderBy,
  // query,
  // updateDoc,
  // where,
} from "firebase/firestore";
import { DeliveryWithId } from "@/types/delivery";
import { order, OrderWithId } from "@/types/order";
import { GeneralSettings } from "@/types/settings";
import { Coupon } from "@/types/coupon";
import { getToken } from "firebase/messaging";
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
      },
    );

    const cloudinaryData = await cloudinaryRes.json();
    const imageUrl = cloudinaryData.secure_url;
    if (!imageUrl) throw new Error("Cloudinary upload failed");
    const productDataToSave = {
      name: body.name,
      description: body.description,
      slug: slugify(body.name),
      price: Number(body.price),
      costPrice: Number(body.costPrice),
      stock: body.stock,
      categories: body.categories,
      tags: body.tags,
      imageUrl: imageUrl,
      createdAt: new Date().toISOString(),
      imagePublicId: cloudinaryData.public_id,
      discount: body.discount,
      hasVariants: body.hasVariants,
      variants: body.variants ?? null,
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

export const addCategory = async (body: Category) => {
  try {
    // setLoading(true);
    const categoryDataToSave = {
      name: body.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 2️⃣ Save product details + image URL to Firestore
    await addDoc(collection(db, "categories"), categoryDataToSave);

    alert("✅ category added successfully!");
  } catch (err) {
    console.error(err);
    alert("Error uploading category");
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

export async function getOrders() {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as order),
    }));

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export const getOrdersByUserId = async (userId: string) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const orders: OrderWithId[] = [];

    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...(doc.data() as order) });
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export async function getCoupons() {
  try {
    const snapshot = await getDocs(collection(db, "coupons"));

    const coupons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Coupon),
    }));

    return coupons;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function getCouponByCode(code: string) {
  const couponRef = collection(db, "coupons");

  const q = query(couponRef, where("code", "==", code.toUpperCase()), limit(1));
  const snap = await getDocs(q);
  // const snap = await db
  //   .collection("coupons")
  //   .where("code", "==", code.toUpperCase())
  //   .limit(1)
  //   .get();

  if (snap.empty) throw new Error("Invalid coupon code");

  const doc = snap.docs[0];
  return { id: doc.id, ...(doc.data() as Coupon) };
}

export async function getProductsByCategory(category?: string) {
  try {
    const productsRef = collection(db, "products");

    const q = category
      ? query(productsRef, where("categories", "array-contains", category))
      : productsRef;

    const snapshot = await getDocs(q);

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

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithId | null> {
  const q = query(collection(db, "products"), where("slug", "==", slug));

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...(doc.data() as Omit<ProductWithId, "id">),
  };
}

export async function getProductById(
  id: string,
): Promise<ProductWithId | null> {
  const ref = doc(db, "products", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<ProductWithId, "id">),
  };
}

export async function getCategoryById(
  id: string,
): Promise<CategoryWithId | null> {
  const ref = doc(db, "categories", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<CategoryWithId, "id">),
  };
}

export async function getOrderById(id: string): Promise<OrderWithId | null> {
  const ref = doc(db, "orders", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<OrderWithId, "id">),
  };
}

export async function getDeliveryOptions() {
  const q = query(
    collection(db, "deliveryOptions"),
    where("isActive", "==", true),
    orderBy("order", "asc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<DeliveryWithId, "id">),
  }));
}

export const editProduct = async (
  id: string,
  body: Product,
  existingImageUrl?: string,
  existingImagePublicId?: string,
) => {
  try {
    let imageUrl = existingImageUrl || "";
    let imagePublicId = existingImagePublicId || "";

    // 1️⃣ Upload new image if user selected one
    if (body.image && body.image instanceof File) {
      const formData = new FormData();
      formData.append("file", body.image);
      formData.append("upload_preset", "unsigned_preset"); // your unsigned preset
      formData.append("folder", "products");

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const cloudinaryData = await cloudinaryRes.json();
      if (!cloudinaryData.secure_url || !cloudinaryData.public_id) {
        throw new Error("Cloudinary upload failed");
      }

      imageUrl = cloudinaryData.secure_url;
      imagePublicId = cloudinaryData.public_id;
    }

    // 2️⃣ Prepare updated product data
    const updatedProductData = {
      name: body.name,
      description: body.description,
      slug: slugify(body.name),
      price: Number(body.price),
      costPrice: Number(body.costPrice),
      stock: body.stock,
      categories: body.categories,
      tags: body.tags,
      imageUrl,
      imagePublicId,
      updatedAt: new Date().toISOString(),
      discount: body.discount,
      hasVariants: body.hasVariants,
      variants: body.variants ?? null,
    };

    // 3️⃣ Update Firestore document
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedProductData);

    alert("✅ Product updated successfully!");
  } catch (err) {
    console.error("Edit product error:", err);
    alert("Error updating product");
  } finally {
    console.log("editProduct finished");
  }
};
export const editCoupon = async (id: string, body: Coupon) => {
  try {
    const couponData = {
      code: body.code,
      type: body.type,
      value: body.value,
      isActive: body.isActive,
      usedCount: body.usedCount,
      minOrderAmount: body.usageLimitTotal,
      usageLimitTotal: body.usageLimitTotal,
      validFrom: body.validFrom,
      validUntil: body.validUntil,
      updatedAt: new Date().toISOString(),
    };

    // 3️⃣ Update Firestore document
    const couponRef = doc(db, "coupons", id);
    await updateDoc(couponRef, couponData);

    alert("✅ Coupon updated successfully!");
  } catch (err) {
    console.error("Edit coupon error:", err);
    alert("Error updating coupon");
  } finally {
    console.log("editCoupon finished");
  }
};

export const editCategory = async (id: string, body: Category) => {
  try {
    const updatedCategoryData = {
      name: body.name,
      updatedAt: new Date().toISOString(),
    };

    // 3️⃣ Update Firestore document
    const categoryRef = doc(db, "categories", id);
    await updateDoc(categoryRef, updatedCategoryData);

    alert("✅ Category updated successfully!");
  } catch (err) {
    console.error("Edit Category error:", err);
    alert("Error updating category");
  } finally {
    console.log("editCategory finished");
  }
};

export const updateOrder = async (id: string, status: string) => {
  try {
    const updatedOrderData = {
      status: status,
      updatedAt: new Date().toISOString(),
    };

    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, updatedOrderData);

    alert("✅ Order updated successfully!");
  } catch (err) {
    console.error("Edit Order error:", err);
    alert("Error updating order");
  } finally {
    console.log("updateOrder finished");
  }
};

export const deleteProduct = async (id: string, imagePublicId?: string) => {
  try {
    if (!confirm("Are you sure you want to delete this product?")) return;

    // 1️⃣ Delete image from Cloudinary
    if (imagePublicId) {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: imagePublicId }),
      });
    }

    // 2️⃣ Delete Firestore document
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);

    alert("✅ Product deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Error deleting product");
  }
};

export const deleteCategory = async (id: string) => {
  try {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const categoryRef = doc(db, "categories", id);
    await deleteDoc(categoryRef);

    alert("✅ category deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Error deleting category");
  }
};
export const deleteCoupon = async (id: string) => {
  try {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    const couponRef = doc(db, "coupons", id);
    await deleteDoc(couponRef);

    alert("✅ coupon deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Error deleting coupon");
  }
};

export const getGeneralSettings = async (): Promise<GeneralSettings | null> => {
  try {
    const settingsDoc = await getDoc(doc(db, "settings", "general"));

    if (settingsDoc.exists()) {
      const data = settingsDoc.data() as Partial<GeneralSettings>;

      // Ensure all required fields exist
      if (data.tax !== undefined) {
        return data as GeneralSettings;
      } else {
        console.warn("General settings missing required fields");
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
};

export const updateSettings = async (settings: Partial<GeneralSettings>) => {
  try {
    const updates: Partial<GeneralSettings> = {};

    // Add timestamps to each section that's being updated
    if (settings.tax) {
      updates.tax = {
        ...settings.tax,
        updatedAt: new Date().toISOString(),
      };
    }

    await setDoc(doc(db, "settings", "general"), updates, { merge: true });

    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error };
  }
};

export const updateDeliveryOptions = async (
  options: DeliveryWithId[],
): Promise<void> => {
  try {
    const updatePromises = options.map((option) =>
      updateDoc(doc(db, "deliveryOptions", option.id), {
        name: option.name,
        price: option.price,
        isActive: option.isActive,
        description: option.description,
        order: option.order,
      }),
    );

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error updating delivery options:", error);
    throw error;
  }
};

export async function addCoupon(body: Coupon) {
  try {
    // prevent duplicate coupon codes

    const existingRef = collection(db, "coupons");

    const q = query(
      existingRef,
      where("code", "==", body.code.toUpperCase()),
      limit(1),
    );
    const existingSnap = await getDocs(q);

    if (!existingSnap.empty) throw new Error("Coupon code already exists");

    // 3️⃣ create coupon document
    const couponDataToSave = {
      code: body.code.toUpperCase(),
      type: body.type,
      value: body.value,
      isActive: true,
      usedCount: 0,
      minOrderAmount: body.minOrderAmount ?? null,
      usageLimitTotal: body.usageLimitTotal ?? null,
      validFrom: new Date(body.validFrom).toISOString(),
      validUntil: new Date(body.validUntil).toISOString(),
      createdAt: new Date().toISOString(),
    };

    await addDoc(collection(db, "coupons"), couponDataToSave);

    alert("✅ coupon added successfully!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "Something went wrong";
    }
  }
}


export async function registerAdminPush(userId: string) {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") return;
  if (!messaging) return;
  if (!("serviceWorker" in navigator)) return;

  // Step A: Register SW manually
  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
  );
  console.log("Service Worker registered:", registration);

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration, // IMPORTANT
  });

  if (!token) return;

  await setDoc(doc(db, `users/${userId}/pushTokens/${token}`), {
    token,
    createdAt: serverTimestamp(),
  });
}
