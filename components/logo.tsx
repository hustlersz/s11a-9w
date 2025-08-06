import Image from "next/image"

export function Logo() {
  return <Image src="/logos.png" alt="Chrome Hearts Logo" fill className="object-contain" priority />
}
