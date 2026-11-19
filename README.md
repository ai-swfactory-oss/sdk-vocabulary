# sdk-vocabulary

The SDK-level vocabulary every SDK uses: failure categories, failures, retry hints and JSON values as data, with pure guards over them (`isFailureCategory`, `isFailure`, `isRetryHint`, `isJsonValue`). It has no side effects and takes no ports.

A `Failure` says whether it is `retryable`, and a `RetryHint` carries `minimumWaitMs`, the shortest wait before a retry.

## Packages

- `@ai-swfactory-oss/sdk-vocabulary`: the vocabulary itself.

## Licence

MIT
