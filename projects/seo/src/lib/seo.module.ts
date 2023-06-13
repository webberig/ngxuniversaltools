import {NgModule} from "@angular/core";
import {SeoService} from "./seo.service";
import {RouterOutletDirective} from "./routerOutlet.directive";

@NgModule({
  declarations: [
    RouterOutletDirective,
  ],
  providers: [
    SeoService,
  ],
  imports: [],
  exports: []
})
export class SeoModule {}
