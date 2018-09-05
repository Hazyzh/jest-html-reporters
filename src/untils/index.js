/**
 * return calss name
 * @param {String} state
 * @param {Number} index
 */
export const getRecordClass = (status, index) => {
  if (status === 'failed') return 'row_fail'
  if (status === 'pending') return 'row_pending'
  if (index % 2) return 'row_pass_even'
  return 'row_pass_odd'
}
