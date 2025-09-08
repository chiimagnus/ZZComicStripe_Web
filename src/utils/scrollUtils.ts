// 平滑滚动到指定元素
export function smoothScrollTo(element: Element | string) {
  const targetElement = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (targetElement) {
    // 检查是否在移动端
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // 移动端使用垂直滚动
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // 桌面端使用水平滚动
      const container = document.getElementById('horizontal-container');
      if (container) {
        const scrollLeft = targetElement.getBoundingClientRect().left - container.getBoundingClientRect().left + container.scrollLeft;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }
}