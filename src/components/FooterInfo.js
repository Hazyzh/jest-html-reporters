import React from 'react'
// import { Divider } from 'antd'

// const Github = 'https://github.com/Hazyzh/jest-html-reporters'
// const Issues = 'https://github.com/Hazyzh/jest-html-reporters/issues'
const versions = process.env.VERSIONS || '1.0.0'

const FooterInfo = () =>
  <div>
    <div className='footer-box'>
      {/* <a href={Github}>Github</a>
      <span />
      <a href={Issues}>Issues</a> */}
    </div>
    <div className='bottom-line'>
      <span />
      <p>
        Versions _{versions}
      </p>
    </div>
  </div>

export default FooterInfo
