# @ngxuniversaltools/process-env

Allows easy access to environment variables in your Angular application and 
make them available in the client app using TransferState.

## Installation

```bash
npm install @ngxuniversaltoolks/process-env
```

Add the `PROCESS_ENV` provider to your `app.config.server.ts` file:

```typescript
import { PROCESS_ENV } from "@ngxuniversaltools/process-env";

const serverConfig: ApplicationConfig = {
  providers: [
    {provide: PROCESS_ENV, useValue: process.env},
  ],
};
```

In older Angular projects in which you may not have an `app.config.server.ts` file, you can add the `PROCESS_ENV` provider to your server.ts file:
```typescript
server.get('*', (req, res) => {
  res.render(indexHtml, {
    req,
    providers: [
      {provide: PROCESS_ENV, useValue: process.env},
    ],
  });
});
```

Next, add the `provideProcessEnv` to your `app.config.ts`:

```
export const appConfig: ApplicationConfig = {
  providers: [
      provideProcessEnv({
        clientVariables: [
          'API_URL',
          'PUBLIC_KEY'
        ],
      }),
  ]
};

```

If you are using `@NgModule` syntax, you can import a legacy Module:
```typescript
@NgModule({
  imports: [
    ProcessEnvModule.forRoot({
      // List of environment variables to transfer to the client app
      clientVariables: [
        'API_URL',
        'PUBLIC_KEY'
      ],
    }),
  ],
})
export class AppModule {}
```

Important: You must provide the list of environment variables you want to transfer to the client app. **Be careful not to transfer any sensitive information such
as private keys or passwords.**

## Usage

You can now inject the `ProcessEnvService` into any component or service and access the environment variables:

```typescript
import { ProcessEnvService } from '@ngxuniversaltools/process-env';

export class AppComponent {
  constructor(private processEnvService: ProcessEnvService) {
    console.log(this.processEnvService.get('API_URL') || environment.apiUrl);
  }
}
```

## Sidenotes

1. You can add [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables from a `.env` file. This makes using environment during development easier.
2. In older versions of Angular universal, the environment variables may not be available when using `ng serve`. Make sure to provide a fallback such as the default environment file from Angular.
