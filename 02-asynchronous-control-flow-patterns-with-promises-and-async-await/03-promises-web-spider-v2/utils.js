import { join, extname } from "path";
import { URL } from "url";
import slug from "slug";
import cheerio from "cheerio";

function getLinkUrl(currentUrl, element) {
  const parsedLink = new URL(element.attribute,href || '', currentUrl)
  const currentParsedUrl = new URL(currentUrl)
  if (parsedLink.hostname !== currentParsedUrl.hostname || !parsedLink.pathname){
    return null
  }
  return parsedLink.toString()
}

export function urlToFilename(url) {
  const parseUrl = new URL(url)
  const urlPath = parseUrl.pathname.split('/')
    .filter(function (component){
      return component !== ''
    })
    .map(function(component){
      return slug(component)
    })
    .join('/')
}
