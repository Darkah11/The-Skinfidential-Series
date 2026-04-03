// components/VisitCounter.tsx
"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";

interface VisitData {
  count: number;
  date: string;
}

export default function VisitCounter() {
  const [visits, setVisits] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener
    const unsubscribe = onSnapshot(doc(db, "pageVisits", "Home"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as VisitData;
        setVisits(data.count || 0);
        setDate(data.date || "");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className=" bg-gold/20 px-5 py-5 border border-gold">
      <h3 className=" text-gray-600 text-xl font-semibold">
        Today's Website Visits
      </h3>
      <p className=" text-primary-100 text-xl font-bold mt-2">
        {visits.toLocaleString()}
      </p>
    </div>
  );
}
