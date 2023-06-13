# @ngxuniversaltools/process-env

Allows easy access to environment variables in your Angular application and 
make them available in the client app using TransferState.

## Installation

```bash
npm install @ngxuniversaltoolks/process-env
```

Add the `PROCESS_ENV` provider to your `server.ts` file:
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

Next, import the `ProcessEnvModule` into your `AppModule`:
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

You must provide the list of environment variables you want to transfer to the client app. Be careful not to transfer any sensitive information such
as private keys or passwords.

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
2. When you run the client app without the server (ie. `ng serve`), the environment is not transferred and will not be available. Make sure to provide a fallback such as the default environment file from Angular.
