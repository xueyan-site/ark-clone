import React, { isValidElement, cloneElement } from 'react'
import cn from 'classnames'
import type { Ref } from 'react'

export type MergeProps = (prev: Partial<any>, curr: Partial<any>) => void

function setRef<T>(ref: Ref<T>, instance: T) {
  if (ref) {
    if (ref instanceof Function) {
      ref(instance)
    } else {
      (ref.current as any) = instance
    }
  }
}

export function clone<T extends React.ReactNode>(
  element: T,
  props?: Partial<any> & React.Attributes,
  merge?: MergeProps
): T {
  if (!isValidElement(element)) {
    return element
  }
  const prev = element.props
  const curr = { ...props }
  if (curr.ref) {
    const currRef = curr.ref
    const prevRef = (element as any).ref || prev.ref
    if (prevRef) {
      curr.ref = (instance: any) => {
        setRef(currRef, instance)
        setRef(prevRef, instance)
      }
    }
  }
  if (prev.className) {
    curr.className = cn(prev.className, curr.className)
  }
  if (prev.style) {
    curr.style = { ...prev.style, ...curr.style }
  }
  if (merge) {
    merge(prev, curr)
  }
  return cloneElement(element, curr) as T
}
