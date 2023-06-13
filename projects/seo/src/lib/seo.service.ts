import {Inject, Injectable} from "@angular/core";
import {Meta, MetaDefinition, Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {JsonLd} from "./seo.types";
import {PageAbstract} from "./PageAbstract";
import {Subject} from "rxjs";

function sanitizeObject<t extends object> (obj: t): t {
  const objClone = {...obj};
  Object.keys(objClone).forEach(key => {
    if (objClone[key as keyof t] === undefined || objClone[key as keyof t] === null) {
      delete objClone[key as keyof t];
    }
  });
  return objClone;
}

@Injectable()
export class SeoService<t extends PageAbstract = PageAbstract> {

  private tags: { [key: string]: MetaDefinition } = {};

  page$ = new Subject<t | null>();

  setPage (page: t | null) {
    this.page$.next(page);
  }

  constructor (
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
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
      property: name,
    };
    this.updateTag(tag);
  }

  setMetas (values: { [key: string]: string }) {
    Object.keys(values).forEach(name => this.setMeta(name, values[name]));
  }

  setJsonLd (jsonLd: JsonLd[]) {
    let ldJsonScriptTag = this.document.head.querySelector("script[type='application/ld+json']");
    if (ldJsonScriptTag) {
      ldJsonScriptTag.textContent = JSON.stringify(jsonLd);
    } else {
      ldJsonScriptTag = this.document.createElement("script");
      ldJsonScriptTag.setAttribute("type", "application/ld+json");
      ldJsonScriptTag.textContent = JSON.stringify(jsonLd);
      this.document.head.appendChild(ldJsonScriptTag);
    }
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
