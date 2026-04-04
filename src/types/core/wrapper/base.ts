export interface SoftDeleteConfig {
  timestampKey?: string | null;
  flagKey?: string | null;
}

export interface HintsConfig {
  includeTableMetadata?: boolean;
  includeRawResults?: boolean;
  includeArguments?: boolean;
}

export interface DebugConfig {
  returnHintsOnError?: boolean;
  hintsConfig?: HintsConfig;
}

export interface TableBehaviour {
  supportsSoftDeletion?: boolean;
  softDeleteConfig?: SoftDeleteConfig;
  debug?: DebugConfig;
}

export interface BucketBehaviour {
  debug?: DebugConfig;
}
