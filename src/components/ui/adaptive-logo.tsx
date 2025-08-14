import { cn } from "@/lib/utils"

interface AdaptiveLogoProps {
  className?: string
}

export function AdaptiveLogo({ className }: AdaptiveLogoProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <img
        src="/lovable-uploads/334c0fdb-b249-4044-ac5c-1bbd104ea82b.png"
        alt="Comunidade Batista Nacional Kerigma - Anunciando e Vivendo o Amor de Cristo"
        className={cn("object-contain h-full w-auto block dark:hidden")}
        loading="eager"
        decoding="async"
      />
      <img
        src="/lovable-uploads/11700eec-d837-4103-93e0-ec07fdcc9d64.png"
        alt="Comunidade Batista Nacional Kerigma - Anunciando e Vivendo o Amor de Cristo (modo escuro)"
        className={cn("object-contain h-full w-auto hidden dark:block")}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}