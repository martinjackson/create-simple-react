import React, { setState, useEffect } from 'react'


const Example_w_hooks = (props) => {

  const [from, setFrom] = setState('...')

  useEffect(() => {
    setTimeout(() => setFrom('React'), 3000);
  }, [from])

    const st = {
      width: '100%',
      height: '50%',
      color: 'white',
      background: '#253237',
    }

    return (
      <div style={st}>Hello from {from}</div>
    );
}

export default Example_w_hooks;