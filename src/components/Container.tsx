import React from 'react'
import { twMerge } from 'tailwind-merge';


interface Props {
    children: React.ReactNode;
    className?: string
}
export default function Container({children, className}: Props) {
  return (
    <div className={twMerge(' max-w-screen-xl mx-auto ', className)}>{children}</div>
  )
}
