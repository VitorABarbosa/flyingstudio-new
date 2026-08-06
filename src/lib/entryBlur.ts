/**
 * Desfoque das animações de entrada — só em telas grandes.
 *
 * No iOS, `filter: blur()` ANIMADO é o efeito mais caro que existe: o Safari
 * re-rasteriza o elemento inteiro (muitas vezes a seção inteira) a cada
 * frame, e mesmo o `blur(0px)` final deixa uma camada de filtro viva no
 * compositor. Na troca de página do iPhone, várias seções entrando juntas
 * com blur somavam um pico de memória que derrubava a aba — vindo de Filmes
 * (capas de vídeo + vidros do menu ainda na tela), qualquer destino crashava.
 *
 * No celular a entrada mantém opacidade e movimento; o desfoque fica para o
 * desktop. `entryBlur(0)` no estado final preserva o comportamento atual do
 * desktop (`blur(0px)`).
 */
export function entryBlur(px: number): string {
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
    return 'none';
  }
  return `blur(${px}px)`;
}
