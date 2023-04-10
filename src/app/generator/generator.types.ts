import { UserFacingErrorTypes } from '../global-types/errors';

interface FailureResponseConfig<T> {
  errorType: UserFacingErrorTypes;
  reason?: string;
  context?: T;
}

type ConfigObjectOrErrorType<T = string | object, K = any> = T extends object
  ? FailureResponseConfig<K>
  : UserFacingErrorTypes;

export class FailureResponse<T = any> {
  userFacingErrorType: UserFacingErrorTypes = UserFacingErrorTypes.DEFAULT;
  reason?: string;
  context?: T;

  constructor(
    configObjectOrErrorType: ConfigObjectOrErrorType<string | object, T>,
    reason?: string,
    context?: T
  ) {
    this.reason = reason;
    this.context = context;

    if (typeof configObjectOrErrorType === 'object') {
      this.userFacingErrorType = configObjectOrErrorType.errorType;
      this.reason = configObjectOrErrorType.reason;
      this.context = configObjectOrErrorType.context;
    } else {
      this.userFacingErrorType = configObjectOrErrorType;
    }
  }

  getHumanizedErrorMessage(): string {
    return `${this.reason || 'There was an error processing the request'} - ${
      this.userFacingErrorType
    }`;
  }
}

export type GeneratorResponse<T = any> = Promise<T | FailureResponse>;
