import {Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState} from "@angular/core";
import {MonoTypeOperatorFunction, Observable, of, startWith, tap} from "rxjs";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";

@Injectable({ providedIn: "root" })
export class TransferStateHelper {


  constructor (
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
  }

  /**
   * Use this as an operator in an observable chain.
   * It will cache the source value on the server, and replay it on the client before the source observable emits its value.
   * Observable will become hot on client (ie. receive cached value early, but http call will still be performed)
   * @param key
   */
  withStateTransfer<t> (key: string): MonoTypeOperatorFunction<t> | MonoTypeOperatorFunction<t | null> {
    const stateKey = makeStateKey<t>(key);
    if (isPlatformServer(this.platformId)) {
      return tap((value: t) => this.transferState.set<t>(stateKey, value));
    }
    if (isPlatformBrowser(this.platformId) && this.transferState.hasKey(stateKey)) {
      const value = this.transferState.get<t | null>(stateKey, null);
      this.transferState.remove<t>(stateKey);
      return startWith(value as t);
    }
    return (source: Observable<t>) => source;
  }

  /**
   * Use this as an observable creator.
   * It will cache the given source value on the server, and return its cached value on the client without subscribing to the
   * given observable source.
   * Observable will remain cold on client (ie. receive cached value immediately without performing http call again)
   * @param key
   */
  getCached<t> (key: string, source: Observable<t>): Observable<t | null> {
    const stateKey = makeStateKey<t>(key);
    if (isPlatformServer(this.platformId)) {
      return source.pipe(
        tap((value: t) => this.transferState.set<t>(stateKey, value))
      );
    }
    if (isPlatformBrowser(this.platformId) && this.transferState.hasKey(stateKey)) {
      const value = this.transferState.get<t | null>(stateKey, null);
      this.transferState.remove<t>(stateKey);
      return of(value);
    }
    return source;
  }
}
