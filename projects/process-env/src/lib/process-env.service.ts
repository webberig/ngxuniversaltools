import {Inject, Injectable, Optional, PLATFORM_ID, TransferState} from "@angular/core";
import {PROCESS_ENV, PROCESS_ENV_STATE, ProcessEnvironment} from "./process-env.types";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";

@Injectable()
export class ProcessEnvService {

  constructor (
    private transferState: TransferState,
    @Optional() @Inject(PROCESS_ENV) private processEnv: ProcessEnvironment,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
  }

  prepareEnv (variables: string[]) {
    if (isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!this.processEnv) {
      throw new Error("PROCESS_ENV has not been provided. Please add it to the providers of ngExpressEngine or a server module.");
    }
    const clientEnv: ProcessEnvironment = variables.reduce((acc, key) => {
      acc[key] = this.processEnv[key];
      return acc;
    }, {} as ProcessEnvironment);
    this.transferState.set(PROCESS_ENV_STATE, clientEnv);
  }

  get (key: string) {
    if (isPlatformServer(this.platformId)) {
      return this.processEnv[key];
    }
    const state = this.transferState.get(PROCESS_ENV_STATE, {});
    return state[key] || null;
  }

}
