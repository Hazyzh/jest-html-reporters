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
/**
 * count percentage and return format result
 * @param {Number} value
 * @param {Number} total
 * @param {Object} options
 */
export const getPercentage = (value, total, { precision = 2 } = {}) => {
  const number = value / total
  return (number * 100).toFixed(precision)
}
