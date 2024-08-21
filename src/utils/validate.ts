import { ObjectId } from 'mongodb';

export function isValidFirebaseUID(uid: string): boolean {
  const uidRegex = /^[A-Za-z0-9-_]{28,256}$/;
  return uidRegex.test(uid);
}

export function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}