import {inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Injectable({providedIn: "root"})
export class Link {

  private readonly document = inject(DOCUMENT);

  setHrefLangs(urls: { [locale in string]: string }) {
    this.removeLinkTags("alternate");

    Object.keys(urls).forEach(locale => {
      const link = this.document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", locale);
      link.setAttribute("href", urls[locale]);
      this.document.head.appendChild(link);
    });
  }

  setCanonical(url: string) {
    this.removeLinkTags("canonical");

    const link = this.document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", url);
    this.document.head.appendChild(link);
  }

  private removeLinkTags(rel: string) {
    const linkTags = this.document.head.querySelectorAll(`link[rel='${rel}']`);
    linkTags.forEach(tag => tag.remove());
  }

}
