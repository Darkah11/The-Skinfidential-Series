// hooks/useTrackPageView.ts
import { useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/config/firebase";
import { db } from "@/config/firebase";
import { doc, increment, setDoc, getDoc } from "firebase/firestore";

export function useTrackPageView(pageName: string) {
  useEffect(() => {
    const trackPage = async () => {
      const analyticsInstance = await analytics;

      if (analyticsInstance) {
        logEvent(analyticsInstance, "page_view", {
          page_title: pageName,
        });
      }

      // Get today's date
      const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const storageKey = `visited_${pageName}_${today}`;

      if (localStorage.getItem(storageKey)) {
        return; // Already counted, don't increment
      }

      const pageRef = doc(db, "pageVisits", pageName);

      // Check if the date is today
      const docSnap = await getDoc(pageRef);

      if (docSnap.exists()) {
        const lastDate = docSnap.data().date;

        // If it's a new day, reset count to 1
        if (lastDate !== today) {
          await setDoc(pageRef, { count: 1, date: today });
        } else {
          // Same day, increment count
          await setDoc(pageRef, { count: increment(1) }, { merge: true });
        }
      } else {
        // First visit ever
        await setDoc(pageRef, { count: 1, date: today });
      }
      localStorage.setItem(storageKey, "true");
    };

    trackPage();
  }, [pageName]);
}
