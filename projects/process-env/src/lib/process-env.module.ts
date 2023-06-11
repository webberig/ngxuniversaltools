import {APP_INITIALIZER, ModuleWithProviders, NgModule} from "@angular/core";
import {ProcessEnvService} from "./process-env.service";


@NgModule({
  declarations: [
  ],
  imports: [
  ],
})
export class ProcessEnvModule {
  static forRoot (config: { clientVariables: string[]; }): ModuleWithProviders<ProcessEnvModule> {
    return {
      ngModule: ProcessEnvModule,
      providers: [
        ProcessEnvService,
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [ProcessEnvService],
          useFactory: (processEnvService: ProcessEnvService) => () => processEnvService.prepareEnv(config.clientVariables)
        }
      ]
    };
  }

}
