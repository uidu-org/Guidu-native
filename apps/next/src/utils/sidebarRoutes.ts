export const getRoutePaths = (path: string, tag?: string) => {
  const pagePath = path ? removeFromLast<string>(path, '.') : path
  const pathname = pagePath ? addTagToSlug(pagePath, tag) : pagePath

  return {
    pagePath,
    pathname,
  }
}
function removeFromLast<T>(path: string, key: string): string | T {
  const i = path.lastIndexOf(key)

  return i === -1 ? path : path.substring(0, i)
}

function addTagToSlug(slug: string, tag?: string) {
  return tag ? slug.replace('/docs', `/docs/tag/${tag}`) : slug
}
