import {NgModule} from "@angular/core";
import {SeoService} from "./seo.service";
import {SeoRouterOutletDirective} from "./seoRouterOutlet.directive";

@NgModule({
  imports: [
    SeoRouterOutletDirective,
  ],
  exports: [
    SeoRouterOutletDirective,
  ]
})
export class SeoModule {
  static forRoot() {
    return {
      ngModule: SeoModule,
      providers: [
        SeoService,
      ]
    };
  }
}
