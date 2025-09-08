import { ArrowRight } from 'lucide-react'

interface FooterProps {
  oniOSBetaClick?: () => void
}

function Footer({ oniOSBetaClick }: FooterProps) {
  return (
    <div className="bottom-pill glass-capsule flex items-center gap-2 rounded-full px-3 py-2 text-sm">
      <span className="hidden sm:inline">iOS 版本内测中</span>
      <span className="sm:hidden">iOS 内测</span>
      <span className="opacity-60">|</span>
      <a
        href="#"
        className="inline-flex items-center gap-1 text-neutral-800 hover:text-neutral-900"
        onClick={(e) => {
          e.preventDefault()
          oniOSBetaClick?.()
        }}
      >
        申请体验
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

export default Footer