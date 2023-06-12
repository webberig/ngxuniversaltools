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
  SeoModule.forRoot()
]
```

## Usage

### Meta tags

The `MetaHandlerService` provides methods to set different properties:

- `setTitle(title: string)` - Sets the title of the page
- `setJsonLd(jsonLd: JsonLd[])` - Sets the JsonLD microdata.
- `setMeta(name: string, content: string)` - Sets a meta tag with the given name and content. Overwrites existing meta
  tags with the same name if present.
- `setMetas(values: { [ key: string ]: string })` - Allows settings multiple meta tags at once
