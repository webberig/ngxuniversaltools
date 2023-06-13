import {Observable, of} from "rxjs";

export abstract class PageAbstract {

  readonly title: Observable<string | null> = of(null);

  readonly description: Observable<string | null> = of(null);

}

