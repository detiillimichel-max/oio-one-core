# PLANO — EVOLUÇÃO DO FRONTEND OIO STREAM HUB

Objetivo: conduzir a evolução do frontend em etapas pequenas, consultando este documento no GitHub antes de cada etapa e verificando o estado real do código antes de qualquer alteração.

REGRA PRINCIPAL: NÃO alterar as Edge Functions nesta fase. O trabalho atual é frontend, contrato de mídia, catálogo/cache e player.

## 0. ESTADO DE REFERÊNCIA — INSPEÇÃO CONCLUÍDA

Data: 2026-10-05

O frontend analisado no Lovable já possui uma base funcional relevante.

Arquivos importantes:

- src/components/MediaRow.tsx — sistema principal de carrosséis; trabalha com MediaTile[].
- src/components/NativePlayer.tsx — player atual.
- src/components/home/EdgeFeedCarousel.tsx — carregamento sob demanda com IntersectionObserver e proteção contra fontes quebradas.
- src/components/home/LibraryFeed.tsx — biblioteca baseada no inventário oio_clips.
- src/routes/hub.tsx — categorias, subcategorias, SourceCarousel e CardTile.
- src/lib/oio-api.ts — cliente unificado das Edge Functions, POST JSON com fallback GET e cache.
- src/lib/oio-clips.ts — leitura do catálogo oio_clips.
- src/lib/oio-sync-client.ts — disparo de sincronizações.
- src/config/feedSources.ts — aproximadamente 90 fontes configuradas.
- src/lib/oio-keys.ts e src/lib/oio-direct.ts — caminho antigo de APIs diretamente no navegador; não usar como arquitetura nova.

## 1. DIAGNÓSTICO DOS CARDS

Existem dois sistemas.

Sistema recomendado:
MediaRow + MediaTile

Sistema legado:
CardTile dentro de hub.tsx

DECISÃO:
Não reconstruir os cards. Consolidar o novo fluxo em torno de MediaTile + MediaRow.

## 2. CATEGORIAS

O Hub atual possui:

OIO_TAXONOMY
→ CategoryChips
→ SubcategoryChips
→ CategoryContent
→ sourcesFor()
→ SourceCarousel

DECISÃO:
Preservar a taxonomia existente. O catálogo novo deve alimentar as categorias sem criar uma segunda taxonomia.

## 3. FONTES

feedSources.ts possui aproximadamente 90 fontes configuradas.

A Biblioteca não necessariamente mostra todas as 90. Ela consulta o inventário oio_clips, agrupa o conteúdo e mostra os grupos que possuem conteúdo disponível.

Na interface observada aparecem aproximadamente 30 fontes.

PROBLEMA:
O fluxo antigo pode produzir uma consulta de inventário mais uma consulta por fonte/grupo.

Com 30 grupos, isso pode chegar a aproximadamente 31 consultas.

META:
Não fazer 30 consultas independentes quando o catálogo/cache já possuir os itens necessários.

## 4. PLAYER — BUG CONFIRMADO

NativePlayer inicia com loading = true.

Vídeo nativo encerra loading com onLoadedData.
Imagem encerra loading com onLoad.

Os iframes de Twitch, Internet Archive e PeerTube não encerram explicitamente o estado de loading.

Isso pode deixar "Preparando player..." preso mesmo quando o iframe já foi carregado.

PRIMEIRA CORREÇÃO:
Adicionar tratamento confiável para carregamento, erro e timeout de players baseados em iframe.

IMPORTANTE:
Não remover simplesmente o loading. O estado deve possuir loading, loaded, error e timeout/fallback.

## 5. CONTRATO DE MÍDIA

O projeto já possui MediaSource e MediaTile.

MediaTile contém atualmente, em essência:
- key
- title
- subtitle
- image
- badge
- source
- media
- tmdb

MediaSource já possui tipos como:
- youtube
- twitch
- archive
- peertube
- video
- image
- external

META:
Criar/normalizar um contrato único para o frontend consumir o resultado das Edges sem conhecer os detalhes de cada API.

Fluxo desejado:

Edge
↓
Media Contract
↓
MediaRow
↓
Universal/Native Player

## 6. CONTRATO DE TRABALHO — EDGES COMPARTILHADAS PELOS DOIS APPS

Esta é uma decisão arquitetural oficial do projeto.

**Uma fonte → um tratamento de Edge → vários aplicativos consumidores.**

O tratamento das fontes deve ser feito nas Edges do ecossistema REDESOCIAL-V2 e, quando estabilizado, consumido também pelo OIO Vibe Hub.

### REDESOCIAL-V2

As mesmas Edges alimentam o REDESOCIAL-V2, que apresenta o conteúdo em **feed vertical estilo YouTube Shorts/TikTok**.

### OIO Vibe Hub

As mesmas Edges alimentam o OIO Vibe Hub, que apresenta o conteúdo em **carrosséis por fonte/categoria**.

Fluxo comum:

Fontes
↓
Edges tratadas
↓
Contrato comum
↙                         ↘
REDESOCIAL-V2             OIO Vibe Hub
↓                         ↓
Feed vertical             Catálogo
Shorts/TikTok             Carrosséis
                          por fonte/categoria
↓                         ↓
Player                    Player

### Regra de responsabilidade

**Edge:** buscar, tratar, normalizar, paginar, proteger, aplicar cache/controle da fonte e entregar contrato estável.

**Frontend:** consumir o contrato, organizar a apresentação e controlar a experiência do usuário.

**Não duplicar tratamento de fonte nos dois aplicativos.**

O catálogo único do OIO Vibe Hub será a ponte entre o contrato das Edges e os carrosséis. Ele não deve recriar a lógica de cada API.

### Regra de congelamento

Durante o trabalho do OIO Vibe Hub, as Edges do REDESOCIAL-V2 permanecem congeladas, salvo autorização explícita. Primeiro validamos o tratamento das Edges; depois conectamos o OIO ao contrato existente.

## 6. SUPABASE

O frontend analisado não depende do cliente @supabase/supabase-js para as funções principais.

A comunicação ocorre principalmente por fetch:

OIO_SUPABASE_URL
↓
/functions/v1
↓
Edge Function

com Authorization Bearer e apikey.

DECISÃO:
Não introduzir uma nova camada Supabase desnecessariamente. Aproveitar o gateway existente.

## 7. CACHE

oio-api.ts possui cache em memória e localStorage com TTL.

Exemplos encontrados:
- YouTube: aproximadamente 15 minutos.
- TMDB: aproximadamente 1 hora.

PROBLEMA:
O cache está fragmentado entre:
- oio-api.ts
- oio-clips.ts
- oio-sync-client.ts
- oio-direct.ts

META:
Criar um fluxo principal:

Catálogo/cache
↓
Frontend
↓
Player

sem chamadas duplicadas para a mesma fonte.

## 8. APIs DIRETAS NO NAVEGADOR — LEGADO

oio-direct.ts acessa diretamente Pexels, YouTube, Twitch, TMDB e GNews.

As chaves são armazenadas localmente através de oio-keys.ts.

DECISÃO:
Não ampliar esse sistema.

A arquitetura nova deve priorizar:

Frontend
↓
Edge Function
↓
API externa

O caminho direto somente será removido quando houver substituição funcional comprovada.

# 9. PLANO DE EXECUÇÃO POR ETAPAS

## ETAPA 1 — CORRIGIR O NATIVEPLAYER

Objetivo: eliminar o "Preparando player..." preso.

Arquivo principal:
src/components/NativePlayer.tsx

Fazer:
- revisar todos os tipos de mídia;
- adicionar estado de carregamento confiável;
- adicionar timeout de segurança;
- tratar erro de iframe;
- manter loading somente enquanto necessário;
- não alterar o contrato das Edges.

Testes mínimos:
- Internet Archive;
- PeerTube;
- Twitch;
- vídeo MP4;
- imagem;
- YouTube.

Status: PENDENTE

## ETAPA 2 — CONSOLIDAR MEDIATILE / MEDIASOURCE

Objetivo: ter um contrato único para todas as fontes.

Arquivos:
- src/components/MediaRow.tsx
- src/lib/oio-media.ts
- tipos relacionados.

Fazer:
- identificar todos os campos realmente usados;
- eliminar duplicações;
- documentar cada media.type;
- garantir que ausência de mídia não quebre o card;
- preparar suporte a URLs de vídeo reais provenientes das Edges.

Status: PENDENTE

## ETAPA 3 — CAMADA UNIVERSALPLAYER

Objetivo: separar o player da lógica específica de cada fonte.

Estrutura desejada:

NativePlayer
↓
MediaRenderer
├── NativeVideo
├── HLS
├── YouTube
├── PeerTube
├── Twitch
├── Archive
├── Image
└── External

Regra:
Não reescrever o player inteiro de uma vez. Extrair progressivamente.

Status: PENDENTE

## ETAPA 4 — CATÁLOGO ÚNICO

Objetivo: reduzir consultas repetidas.

Hoje:
inventário
↓
30 grupos
↓
30 consultas

Meta:
catálogo/cache
↓
grupos
↓
itens já disponíveis
↓
cards

Fazer:
- revisar fetchClipsInventory();
- revisar fetchClipsBySource();
- identificar dados que já chegam no inventário;
- medir duplicação;
- somente depois alterar o fluxo.

Status: PENDENTE

## ETAPA 5 — LAZY LOADING DO CATÁLOGO

Usar a ideia já existente em EdgeFeedCarousel.

Meta:
- não carregar tudo imediatamente;
- carregar somente o que entra próximo da viewport;
- respeitar cache;
- evitar chamadas repetidas;
- manter fallback para fontes sem conteúdo.

Status: PENDENTE

## ETAPA 6 — UNIFICAR CATEGORIAS + CATÁLOGO

Fluxo final:

OIO_TAXONOMY
↓
categoria
↓
subcategoria
↓
catálogo
↓
fontes disponíveis
↓
MediaRow
↓
MediaTile

Não criar uma segunda taxonomia paralela.

Status: PENDENTE

## ETAPA 7 — INTEGRAR O CATÁLOGO DO REDESOCIAL-V2

Somente depois das etapas anteriores.

Objetivo:

REDESOCIAL-V2
↓
catálogo/cache central
↓
OIO Stream Hub

O frontend deve consumir o contrato final e não conhecer as regras internas de cada API.

REGRA:
As Edges do REDESOCIAL-V2 permanecem congeladas durante esta etapa, salvo correção explicitamente autorizada.

Status: PENDENTE

## ETAPA 8 — REMOVER CAMINHOS ANTIGOS

Somente depois de provar que o novo caminho funciona.

Possíveis candidatos:
- chamadas duplicadas;
- consultas individuais desnecessárias;
- caminhos diretos de API;
- componentes antigos de card;
- caches duplicados.

REGRA:
Nada será apagado somente por parecer antigo.

Cada remoção exige:
1. substituto funcionando;
2. teste;
3. confirmação;
4. registro neste documento.

Status: PENDENTE

# 10. PROTOCOLO DE TRABALHO

Antes de cada etapa:

1. Consultar este arquivo no GitHub.
2. Verificar o estado atual dos arquivos no GitHub.
3. Comparar com o estado registrado aqui.
4. Propor a menor alteração necessária.
5. Fazer uma etapa por vez.
6. Testar.
7. Registrar arquivos alterados, correção, testes, resultado e próximo passo.

# 11. REGRA DE SEGURANÇA

Durante este plano:

NÃO alterar Edge Functions do REDESOCIAL-V2 sem autorização específica.

Especialmente:
- não trocar secrets;
- não mudar rate limit;
- não mudar cache das Edges;
- não remover fontes;
- não alterar o roteador;
- não alterar contratos das Edges sem necessidade comprovada.

O frontend deve primeiro aprender a consumir o contrato existente.

# 12. CHECKLIST

## Player
- [ ] Archive não fica preso em loading
- [ ] PeerTube não fica preso em loading
- [ ] Twitch não fica preso em loading
- [ ] MP4 funciona
- [ ] imagem funciona
- [ ] YouTube funciona
- [ ] timeout funciona
- [ ] erro funciona

## Contrato
- [ ] MediaSource documentado
- [ ] MediaTile documentado
- [ ] tipos normalizados
- [ ] URL de mídia real suportada
- [ ] fallback definido

## Catálogo
- [ ] inventário analisado
- [ ] consultas duplicadas identificadas
- [ ] cache central definido
- [ ] lazy loading validado
- [ ] fontes dinâmicas preservadas

## Categorias
- [ ] OIO_TAXONOMY preservada
- [ ] subcategorias preservadas
- [ ] fontes conectadas ao catálogo
- [ ] MediaRow reutilizado

## Segurança
- [ ] nenhuma Edge alterada sem autorização
- [ ] nenhuma fonte apagada
- [ ] nenhuma API key adicionada ao frontend
- [ ] caminhos antigos só removidos após substituição

# 13. PRÓXIMO PASSO

ETAPA 1 — NativePlayer

Antes de editar:
1. consultar este documento;
2. consultar NativePlayer.tsx atual no GitHub;
3. comparar com a versão atual do Lovable;
4. localizar exatamente o bloco de loading;
5. propor a menor alteração possível;
6. testar Archive primeiro.

Não avançar para a Etapa 2 enquanto a Etapa 1 não estiver validada.

# HISTÓRICO

2026-10-05
- Inspeção frontend realizada.
- Identificados dois sistemas de cards.
- Identificado fluxo de categorias.
- Identificadas aproximadamente 90 fontes configuradas.
- Identificado catálogo dinâmico oio_clips.
- Identificado cache fragmentado.
- Confirmado uso de fetch() para Edge Functions.
- Confirmado bug de loading no NativePlayer para iframes.
- Definido plano de execução por etapas.
- Edges do REDESOCIAL-V2 mantidas congeladas.
