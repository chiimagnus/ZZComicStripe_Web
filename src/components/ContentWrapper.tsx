import type { JSX, ReactNode } from 'react'

interface ContentWrapperProps {
  children: ReactNode
  className?: string
}

function ContentWrapper({ children, className = '' }: ContentWrapperProps): JSX.Element {
  return (
    <div 
      className={className}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

export default ContentWrapper