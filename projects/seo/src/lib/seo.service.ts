import {inject, Inject, Injectable} from "@angular/core";
import {Meta, MetaDefinition, Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {JsonLd} from "./seo.types";
import {PageAbstract} from "./PageAbstract";
import {ReplaySubject} from "rxjs";
import {LdJson} from "./ldJson.service";
import {Link} from "./link.service";

function sanitizeObject<t extends object> (obj: t): t {
  const objClone = {...obj};
  Object.keys(objClone).forEach(key => {
    if (objClone[key as keyof t] === undefined || objClone[key as keyof t] === null) {
      delete objClone[key as keyof t];
    }
  });
  return objClone;
}

@Injectable({providedIn: "root"})
export class SeoService<t extends PageAbstract = PageAbstract> {

  private meta = inject(Meta);

  private title = inject(Title);

  private jsonLd = inject(LdJson);

  private link = inject(Link);

  private tags: { [key: string]: MetaDefinition } = {};

  page$ = new ReplaySubject<t | null>(1);

  setPage (page: t | null) {
    this.page$.next(page);
  }

  setTitle (title: string) {
    this.title.setTitle(title);
  }

  setMeta (name: string, content: string) {
    const isRDFa = name.startsWith("og:");
    const tag: MetaDefinition = isRDFa ? {
      content,
      property: name,
    } : {
      content,
      name: name,
    };
    this.updateTag(tag);
  }

  setMetas (values: { [key: string]: string }) {
    Object.keys(values).forEach(name => this.setMeta(name, values[name]));
  }

  setJsonLd (jsonLd: JsonLd[]) {
    this.jsonLd.setJsonLd(jsonLd);
  }

  setCanonical (url: string) {
    this.link.setCanonical(url);
  }

  setHrefLangs (urls: { [locale in string]: string }) {
    this.link.setHrefLangs(urls);
  }

  private updateTag (tag: MetaDefinition) {
    const sanitizedTag = sanitizeObject(tag);
    const selector = sanitizedTag.property ? `property='${sanitizedTag.property}'` : `name='${sanitizedTag.name}'`;

    if (this.meta.getTag(selector)) {
      if (sanitizedTag.content) {
        this.meta.updateTag(sanitizedTag, selector);
        this.tags[selector] = sanitizedTag;
      } else {
        this.meta.removeTag(selector);
        delete this.tags[selector];
      }
    } else if (sanitizedTag.content) {
      this.meta.addTag(sanitizedTag);
      this.tags[selector] = sanitizedTag;
    }
  }

}
