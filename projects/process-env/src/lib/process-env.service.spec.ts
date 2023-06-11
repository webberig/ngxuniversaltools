import { TestBed } from '@angular/core/testing';

import { ProcessEnvService } from './process-env.service';
import {PROCESS_ENV} from "./process-env.types";
import {PLATFORM_ID} from "@angular/core";

describe('ProcessEnvService', () => {
  let service: ProcessEnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProcessEnvService,
        {
          provide: PROCESS_ENV,
          useValue: {}
        },
        {
          provide: PLATFORM_ID,
          useValue: 'browser',
        }
      ]
    });
    service = TestBed.inject(ProcessEnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
