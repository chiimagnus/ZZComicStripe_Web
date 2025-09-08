// 平滑滚动到指定元素
export function smoothScrollTo(element: Element | string) {
  // 改为触发翻页：通过自定义事件把目标 id 发送给 BookFlipProvider
  const id = typeof element === 'string'
    ? element.replace(/^#/, '')
    : (element as Element).id

  if (!id) return

  window.dispatchEvent(new CustomEvent('zz:flipToId', { detail: { id } }))
}