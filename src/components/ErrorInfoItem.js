import React from 'react'
import Convert from 'ansi-to-html'
const convert = new Convert({
  fg: '#595959'
})

const createMarkup = (text) => ({
  __html: convert.toHtml(text)
})

const ErrorInfoItem = ({ data }) => {
  if (!data) return null
  return <pre dangerouslySetInnerHTML={createMarkup(data)} />
}

export default ErrorInfoItem
