import {NgModule} from "@angular/core";
import {SeoService} from "./seo.service";
import {RouterOutletDirective} from "./routerOutlet.directive";

@NgModule({
  declarations: [
    RouterOutletDirective,
  ],
  exports: [
    RouterOutletDirective,
  ]
})
export class SeoModule {
  static forRoot () {
    return {
      ngModule: SeoModule,
      providers: [
        SeoService,
      ]
    };
  }
}
