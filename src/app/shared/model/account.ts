/** Whether someone accepted the privacy text in force (HU-045). */
export interface ConsentStatus {
  accepted: boolean;
  /** The version they accepted; null if they accepted none */
  acceptedVersion: string | null;
  acceptedAt: string | null;
  /** The version in force: a new text asks again */
  currentVersion: string;
}
