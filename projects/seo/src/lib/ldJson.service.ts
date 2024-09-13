import {inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {JsonLd} from "./seo.types";

@Injectable({providedIn: "root"})
export class LdJson {

  private readonly document = inject(DOCUMENT);

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

}
