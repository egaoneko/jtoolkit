import { SignJWT, base64url, jwtVerify } from 'jose';
import short from 'short-uuid';

const translator = short(short.constants.flickrBase58);

export interface GenerateOption {
  alg: string;
  issueAt?: boolean | number;
  expirationTime?: number | string;
  secret: Uint8Array;
}

export async function generate(options: GenerateOption): Promise<{
  header: string;
  token: string;
}> {
  const { alg, issueAt, expirationTime, secret } = options;
  const uid = translator.new();

  const builder = new SignJWT({ uid }).setProtectedHeader({ alg });

  if (issueAt) {
    builder.setIssuedAt(Number.isInteger(issueAt) ? (issueAt as number) : undefined);
  }

  if (expirationTime) {
    builder.setExpirationTime(expirationTime);
  }

  const jwt = await builder.sign(secret);
  const [header, ...rest] = jwt.split('.');
  return {
    header,
    token: rest.join('.'),
  };
}

export async function verify(header: string, token: string, secret: Uint8Array) {
  return jwtVerify([header, token].join('.'), secret);
}

const encoder = new TextEncoder();

export function encodeSecret(secret: string): Uint8Array {
  return encoder.encode(secret);
}

export function generateHeader(alg: string): string {
  return base64url.encode(JSON.stringify({ alg }));
}
