import { AccessLog } from "../../domain/entities/AccessLog";
import { AccessLogRepository } from "../../domain/repositories/AccessLogRepository";
import { db } from "../firebase/firebase";

export class FirebaseAccessLogRepository implements AccessLogRepository {
  async create(log: AccessLog): Promise<void> {
    await db.ref(`logs/${log.doorId}`).push(log);
  }
}