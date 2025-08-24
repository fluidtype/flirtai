/**
 * Minimal Web3 utilities for future token gating.
 * Currently returns true when the FEATURE_WEB3_GATE flag is disabled.
 * Server implementations can extend this using viem or other providers.
 */
export async function checkTokenGate(address: string): Promise<boolean> {
  if (process.env.FEATURE_WEB3_GATE !== 'true') {
    return true;
  }
  // TODO: implement on-chain check using viem
  return true;
}
