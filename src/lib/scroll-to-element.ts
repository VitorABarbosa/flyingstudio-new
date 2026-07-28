/**
 * Rola até um elemento respeitando o Lenis.
 *
 * O `scrollIntoView` nativo briga com a rolagem suave: se um glide do mouse
 * ainda está em curso, o Lenis segue animando para o alvo dele e engole o
 * comando — o clique parece não funcionar. Quando o Lenis existe, o pedido
 * vai para ele, que cancela o glide e assume o destino.
 */
export function scrollToElement(id: string) {
  const target = document.getElementById(id);

  if (!target) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target, { duration: 1.15, lerp: 0.09 });
    return;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
