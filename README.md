# Castelo da Cortina

<strong>Autores:</strong>
Caik Moraes e Thiago Rodrigues </br>
Site para divulgação da empresa Castelo da Cortina.</br>
Portifólio com imagens retiradas de trabalhos já realizados pelo dono da empresa, Zelito das Cortinas.

## Tecnologias

Site estático em HTML, CSS e JavaScript puro, sem etapa de build e sem bibliotecas externas. As fontes (DM Serif Display e Manrope) ficam em `fonts/` e os ícones são SVG embutidos no próprio HTML.

## Como rodar localmente

O site precisa ser servido por HTTP a partir da raiz do repositório (abrir os arquivos direto pelo navegador quebra as galerias, que carregam as listas de fotos de `jsons/`):

```sh
python -m http.server 8000
```

Depois acesse http://localhost:8000.

## Estrutura

| Pasta / arquivo | Conteúdo |
| --- | --- |
| `index.html` | Página inicial |
| `pages/` | Páginas de Cortinas, Persianas, Toldos e Contato |
| `javascript/script.js` | Script único: cabeçalho, menu, rodapé, botão fixo do WhatsApp, seletor de modelos e galeria de fotos |
| `css/style.css` | Folha de estilos única (cores, fontes e espaçamentos definidos no início do arquivo) |
| `img/img_<página>/<categoria>/` | Fotos dos trabalhos, em WebP |
| `jsons/img_<página>/<categoria>/images.json` | Lista de fotos de cada galeria (gerada por script) |
| `scripts/` | Scripts para otimizar fotos e gerar as listas |

## Adicionando fotos a uma galeria

1. Coloque a imagem (JPEG ou PNG) em `img/img_<página>/<categoria>/` (ex.: `img/img_cortinas/rolos/`).
2. Rode os dois scripts a partir da raiz do repositório (precisa do [libvips](https://www.libvips.org/)):
   ```sh
   scripts/optimize-images.sh          # converte para WebP e apaga o original
   python3 scripts/build_manifests.py  # atualiza todos os images.json
   ```

Para criar uma categoria nova, crie a pasta de imagens, rode os dois scripts e adicione o `<article>` do modelo e o botão correspondente na página.

## Publicação (deploy)

O site é publicado copiando os arquivos por SSH para a pasta `www/` do servidor, que é a raiz do site. O domínio passa pelo Cloudflare. Usuário e servidor ficam no painel da hospedagem; não os coloque no repositório.

1. Atualize a `master` local:
   ```sh
   git switch master && git pull
   ```
2. A partir da raiz do repositório, copie só os arquivos do site (sem `.git`, `scripts/`, `README.md` e `CLAUDE.md`):
   ```sh
   scp -r index.html robots.txt sitemap.xml css fonts img javascript jsons pages \
     <usuário>@<servidor>:www/
   ```
   Os arquivos precisam ficar direto em `www/`, nunca numa subpasta dela; senão o site sai do ar (erro 403). O `scp` sobrescreve, mas não apaga: arquivos removidos do repositório precisam ser apagados à mão no servidor.
3. No Cloudflare, limpe o cache (Caching → Purge Everything).
4. Confira a página inicial e o `/sitemap.xml` no navegador.
