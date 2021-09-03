export class HttpResponse {
  readonly code: number;
  readonly message: string;
  readonly data: Record<string, unknown>;

  constructor(code: number, message: string, data?: any) {
    return { code: code, message: message, data: data };
  }
}
