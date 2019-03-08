/**
 * the time for dealy
 * @param {number} waitTime 
 */
export const timeout = (waitTime) => {
  return new Promise((r) => setTimeout(() => r(waitTime), waitTime))
}