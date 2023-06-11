import {InjectionToken, makeStateKey} from "@angular/core";

export const PROCESS_ENV = new InjectionToken("PROCESS_ENV");

export const PROCESS_ENV_STATE = makeStateKey<{[key: string]: string}>("PROCESS_ENV_STATE");
