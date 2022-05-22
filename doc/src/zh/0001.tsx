import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
本工具是对 React.cloneElement 方法的封装。

\`\`\`ts
type clone<T extends React.ReactNode> = (
  element: T,                               // 原节点
  props?: Partial<any> & React.Attributes,  // 克隆时新添加的属性（className、style、ref 会与原属性合并在一起）
  merge?: MergeProps                        // 自定义新添加的属性与原节点上的属性的合并方法
) => T                                      // 若 element 不是 React 元素，则原样输出
\`\`\`

\`\`\`ts
type MergeProps = (
  prev: Partial<any>,  // 原节点的属性
  curr: Partial<any>   // 新添加的属性
) => void
\`\`\`

与 React.cloneElement 方法不同，在克隆时传入的 \`className\`、\`style\`、\`ref\` 属性，会与原节点的属性合并在一起，而不是浅层覆盖。例如：

\`\`\`ts
const node = <div className="a"/>
clone(node, { className: 'b' })
\`\`\`

得到的结果是：

\`\`\`ts
<div className="a b"/>
\`\`\`

## 用法一

获取组件 children 的 ref，同时保证原来的 ref 参数有效。

\`\`\`
function Demo({
  children
}: { 
  children: React.ReactNode 
}) {
  const ref = useRef<any>(null)
  return clone(children, { ref })
}
\`\`\`

## 用法二

新增组件 children 的 className 和 style，同时保证原来的 className 有效，style 内部浅层合并。

\`\`\`
function Demo({
  children
}: { 
  children: React.ReactNode 
}) {
  return clone(children, {
    className: 'b',
    style: {
      color: '#fff'
    }
  })
}
\`\`\`

## 用法三

新增组件 children 的 onClick，同时保证原来的 onClick 有效。

\`\`\`
function Demo({
  children,
  onClick
}: { 
  children: React.ReactNode 
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) {
  return clone(children, { onClick }, (prev, curr) => {
    const currOnClick = curr.onClick
    curr.onClick = event => {
      if (currOnClick) {
        currOnClick(event)
      }
      if (prev.onClick) {
        prev.onClick(event)
      }
    }
  })
}
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
