// 平滑滚动到指定元素
export function smoothScrollTo(element: Element | string) {
  const isMobile = window.innerWidth < 768
  const id = typeof element === 'string' ? element.replace(/^#/, '') : (element as Element).id
  console.log('smoothScrollTo called with element:', element, 'isMobile:', isMobile, 'id:', id)
  if (!id) return

  if (isMobile) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  } else {
    window.dispatchEvent(new CustomEvent('zz:flipToId', { detail: { id } }))
  }
}