import { AccessLog } from "../entities/AccessLog";

export interface AccessLogRepository {
  create(log: AccessLog): Promise<void>;
}