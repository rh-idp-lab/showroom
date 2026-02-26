'use strict'

module.exports.register = function () {
  this.on('documentsConverted', ({ contentCatalog }) => {
    contentCatalog.getComponents().forEach(({ versions }) => {
      versions.forEach(({ name: component, version }) => {
        contentCatalog.findBy({ component, version, family: 'page' }).forEach((page) => {
          const attrs = page.asciidoc?.attributes || {}
          const raw = attrs['page-links']
          if (!raw) return
          let links
          try {
            links = typeof raw === 'string' ? JSON.parse(raw) : raw
          } catch {
            return
          }
          if (!Array.isArray(links)) return
          const resolved = links.map((link) => {
            const url = (link.url || '').replace(/\{(\w[\w-]*)\}/g, (_, name) => attrs[name] || attrs['page-' + name] || `{${name}}`)
            return { ...link, url }
          })
          page.asciidoc.attributes['page-links'] = resolved
        })
      })
    })
  })
}
