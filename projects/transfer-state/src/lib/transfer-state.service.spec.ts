import {TestBed} from "@angular/core/testing";
import {TransferStateHelper} from "./transfer-state.service";
import {PLATFORM_ID, TransferState} from "@angular/core";


describe("TransferStateHelper", () => {
  let service: TransferStateHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransferStateHelper,
        {
          provide: TransferState,
          useValue: {}
        },
        {
          provide: PLATFORM_ID,
          useValue: "browser"
        }
      ]
    });
    service = TestBed.inject(TransferStateHelper);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
