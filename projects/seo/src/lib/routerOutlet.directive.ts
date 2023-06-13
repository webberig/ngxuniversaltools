import {Directive} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {map} from "rxjs";
import {PageAbstract} from "./PageAbstract";
import {SeoService} from "./seo.service";

@Directive({
  selector: "router-outlet"
})
export class RouterOutletDirective {

  constructor (r: RouterOutlet, seo: SeoService) {
    r.activateEvents.pipe(
      map(componentInstance => componentInstance instanceof PageAbstract ? componentInstance : null)
    ).subscribe(page => {
      seo.setPage(page);
    });
  }

}
