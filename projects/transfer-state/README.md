# @ngxuniversaltools/transfer-state

Provides a service which provides easy access to TransferState mechanisms in observable chains.

## Installation

```bash
npm install @ngxuniversaltools/transfer-state
```

Add `TransferStateModule` to your app module:

```typescript
import {TransferStateModule} from '@ngxuniversaltools/transfer-state';

@NgModule({
  imports: [
    TransferStateModule
  ]
})
export class AppModule {}
```

## Usage

```typescript
import {TransferStateService} from '@ngxuniversaltools/transfer-state';
```

### transferStateService.withStateTransfer

Use this as an operator in an observable chain. It will cache the source value on the server, and replay it on the
client before the source observable emits its value.
Observable will become hot on client (ie. receive cached value early, but http call will still be performed)

Example:

```typescript
api.fetchData().pipe(
  this.transferStateService.withStateTransfer('my-cache-key')
)
```

Server will call api and transfer the result to the client.

The client will immediately emit the cached value coming from the server, and then perform the http call again.

### transferStateService.getCached

Use this as an observable creator. It will cache the given source value on the server, and return its cached value on
the client without subscribing to the
given observable source. Observable will remain cold on client (ie. receive cached value immediately without performing
http call again)

Example:

```typescript
this.transferStateService.getCached('my-cache-key', api.fetchData())
```

Server will call api and transfer the result to the client.

The client will immediately emit the cached value coming from the server, and will NOT perform the http call again.
