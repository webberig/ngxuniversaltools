import {APP_INITIALIZER, Provider} from "@angular/core";
import {ProcessEnvService} from "./process-env.service";

export function provideProcessEnv(config: { clientVariables: string[]; }): Provider[] {
  return [
    ProcessEnvService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ProcessEnvService],
      useFactory: (processEnvService: ProcessEnvService) => () => processEnvService.prepareEnv(config.clientVariables)
    }
  ]
}
