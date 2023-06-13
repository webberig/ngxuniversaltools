# @ngxuniversaltools/seo

Provides helper functions to manipulate meta tags, titles and JsonLD microdata. Much of the code is based on
the [ngx-seo](https://github.com/samvloeberghs/kwerri-oss/tree/master/projects/ngx-seo) package.

## Installation

```bash
npm install @ngxuniversaltools/seo
```

Add the following to your `app.module.ts`:

```typescript
import {SeoModule} from '@ngxuniversaltools/seo';

imports: [
  SeoModule
]
```

## Usage

### Setting title and meta tags

The `SeoService` provides methods to set different properties:

- `setTitle(title: string)` - Sets the title of the page
- `setJsonLd(jsonLd: JsonLd[])` - Sets the JsonLD microdata.
- `setMeta(name: string, content: string)` - Sets a meta tag with the given name and content. Overwrites existing meta
  tags with the same name if present.
- `setMetas(values: { [ key: string ]: string })` - Allows settings multiple meta tags at once

### Using PageAbstract

This oppinionated part of the library can be used to allow components to easily provide meta data for the page. The
component
declared in your route should extend the `PageAbstract` class and override properties when applicable. Finally you can
use `@ngrx/effects` to subscribe to the `page$` observable and set the title and meta tags.

Example:

  ```typescript
  {
  path: "category",
    component
:
  CategoryComponent,
}
  ```

Your component should look like this:

```typescript
import {PageAbstract} from '@ngxuniversaltools/seo';
import {of} from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends PageAbstract {
  title = of('Category'); // Simple static title
  description = this.translate.get("category.description"); // Translated description
}
```

You must create subscribers to actually set the title and meta tags. If you use `@ngrx/effects` this can be easily
achieved:

```typescript
export class PageEffects {
  title$ = createEffect(() => this.seo.page$.pipe(
    switchMap(page => page?.title || of("")),
    map(title => title ? [title, "My cool website"].join(" | ") : "My cool website"),
    tap(({title}) => this.seo.setTitle(title))
  ), {dispatch: false});

  constructor (private seo: SeoService) {
  }
}
```

### Extending PageAbstract

You may need additional properties to be controlled by the page component. This can be achieved by creating your own
PageAbstract class:

```
export class MyAppPageAbstract extends PageAbstract {
  image = of("https://example.com/image.png");  
}

export class CategoryComponent extends MyAppPageAbstract {
  title = of('Category'); // Simple static title
  description = this.translate.get("category.description"); // Translated description
  image = this.api.getFirstPost().pipe(map => map.image); // Dynamic image
}

```

Finally add an effect to set og:image meta tags:

  ```typescript
  export class PageEffects {
  image$ = createEffect(() => this.seo.page$.pipe(
    switchMap(page => page?.image || of("")),
    tap(image => this.seo.setMetas({
      "og:image": image?.url || null,
      "og:image:alt": image?.alt || null,
      "og:image:width": image?.width ? image.width.toString() : null,
      "og:image:height": image?.height ? image.height.toString() : null,
    }))
  ), {dispatch: false});

  constructor (private seo: SeoService<MyAppPageAbstract>) {
  }
}
  ```

Pay attention to the constructor of the effect. You must provide the type of your custom PageAbstract class when
importing SeoService.
