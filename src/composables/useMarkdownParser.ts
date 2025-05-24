import { createMarkdownParser, rehypeHighlight, createShikiHighlighter } from '@nuxtjs/mdc/runtime'
import MaterialThemePalenight from '@shikijs/themes/material-theme-palenight'
import HtmlLang from '@shikijs/langs/html'
import MdcLang from '@shikijs/langs/mdc'
import TsLang from '@shikijs/langs/typescript'
import VueLang from '@shikijs/langs/vue'
import ScssLang from '@shikijs/langs/scss'
import YamlLang from '@shikijs/langs/yaml'

export default function useMarkdownParser() {
  let parser: Awaited<ReturnType<typeof createMarkdownParser>>

  const parse = async (markdown: string) => {
    if (!parser) {
      parser = await createMarkdownParser({
        rehype: {
          plugins: {
            highlight: {
              instance: rehypeHighlight,
              options: {
                theme: 'material-theme-palenight',
                highlighter: createShikiHighlighter({
                  bundledThemes: {
                    'material-theme-palenight': MaterialThemePalenight,
                  },
                  bundledLangs: {
                    html: HtmlLang,
                    mdc: MdcLang,
                    vue: VueLang,
                    yml: YamlLang,
                    scss: ScssLang,
                    ts: TsLang,
                    typescript: TsLang,
                  },
                }),
              },
            },
          },
        },
      })
    }
    return parser(markdown)
  }

  return parse
}
