import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';

export function assertAuthenticated(request: CallableRequest): string {
  if (!request.auth || !request.auth.uid) {
    throw new HttpsError('unauthenticated', 'User must be authenticated to perform this action.');
  }
  return request.auth.uid;
}
