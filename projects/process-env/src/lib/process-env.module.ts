import {ModuleWithProviders, NgModule} from "@angular/core";
import {provideProcessEnv} from "./provideProcessEnv";


@NgModule({
  declarations: [],
  imports: [],
})
export class ProcessEnvModule {
  static forRoot(config: { clientVariables: string[]; }): ModuleWithProviders<ProcessEnvModule> {
    return {
      ngModule: ProcessEnvModule,
      providers: provideProcessEnv(config)
    };
  }

}
