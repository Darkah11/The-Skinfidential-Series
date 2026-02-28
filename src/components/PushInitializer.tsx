"use client"

import { User } from "@/types/user";
import { registerAdminPush } from "@/utils/firebase"
import { useEffect } from "react"

interface MyComponentsProps {
  user: User | null;
}

export function PushInitializer({user}: MyComponentsProps) {

  useEffect(() => {
    if (!user) return

    if (user.role === "admin") {
      registerAdminPush(user.uid)
    }

  }, [user])

  return null
}