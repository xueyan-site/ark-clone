import React, { useEffect, useRef, forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import { clone } from 'xueyan-react-clone'

interface SomeRef {
  some: any
}

interface SomeProps {
  style: React.CSSProperties
}

const SomeComponent = forwardRef<SomeRef, SomeProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    some: 'some'
  }), [])
  return <div {...props}>ddd</div>
})

export default function Main() {
  const ref1 = useRef<SomeRef>(null)
  const ref2 = useRef<SomeRef>(null)
  useEffect(() => {
    console.log(ref1)
    console.log(ref2)
  }, [])
  return (
    <div
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: '#f93'
      }}>
      {clone(
        <SomeComponent
          ref={ref1}
          style={{ 
            width: '200px',
            height: '200px',
            backgroundColor: '#39f'
          }}
        />,
        {
          ref: ref2,
          style: {
            backgroundColor: '#f93'
          }
        }
      )}
    </div>
  )
}
