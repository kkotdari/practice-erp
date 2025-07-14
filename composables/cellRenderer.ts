import { type VNode, h } from 'vue'
import type { Opt } from './numberFomatter'
import { useNumberFormatter } from './numberFomatter'
import { BASE_CELL_STYLE, CHIP_CELL_STYLE, INPUT_CELL_STYLE } from '~/styles/tableCellStyle'

type CellGetter<T> = (row: any) => T
export type CellRendererFunc<T> = (getter: CellGetter<T>, cellStyle?: string) => (row: any) => VNode

export interface CellRendererSet {
  textCell: CellRendererFunc<string | number>
  naturalCell: {
    (getter: CellGetter<number | string>): (row: any) => VNode
    (getter: CellGetter<number | string>, opt: Opt): (row: any) => VNode
    (getter: CellGetter<number | string>, cellStyle: string): (row: any) => VNode
    (getter: CellGetter<number | string>, opt: Opt, cellStyle: string): (row: any) => VNode
  }
  decimalCell: {
    (getter: CellGetter<number | string>): (row: any) => VNode
    (getter: CellGetter<number | string>, opt: Opt): (row: any) => VNode
    (getter: CellGetter<number | string>, cellStyle: string): (row: any) => VNode
    (getter: CellGetter<number | string>, opt: Opt, cellStyle: string): (row: any) => VNode
  }
  chipCell: CellRendererFunc<string | number>
  inputCell: CellRendererFunc<string | number>
}

function parseNumberParts(raw: number | string): { num: number, prefix: string, suffix: string } {
  let num: number
  let prefix = ''
  let suffix = ''

  if (typeof raw === 'string') {
    const text = raw.trim()
    const match = text.match(/^([^0-9+\-,.]*)([+\-]?[0-9,]+(?:\.\d+)?)([^0-9+\-,.]*)$/)
    if (match) {
      prefix = match[1]
      const numberPart = match[2]
      suffix = match[3]
      num = Number.parseFloat(numberPart.replace(/,/g, '')) || 0
    }
    else {
      num = Number.parseFloat(text.replace(/[^[0-9\-.+]\]/g, '')) || 0
    }
  }
  else {
    num = raw
  }

  return { num, prefix, suffix }
}

export function useCellRenderer(): CellRendererSet {
  const { toNumberString } = useNumberFormatter()

  const textCell: CellRendererFunc<string | number> = (getter, cellStyle = BASE_CELL_STYLE) =>
    row => h('span', { style: cellStyle }, getter(row))

  function naturalCell(getter: CellGetter<number | string>): (row: any) => VNode
  function naturalCell(getter: CellGetter<number | string>, opt: Opt): (row: any) => VNode
  function naturalCell(getter: CellGetter<number | string>, cellStyle: string): (row: any) => VNode
  function naturalCell(getter: CellGetter<number | string>, opt: Opt, cellStyle: string): (row: any) => VNode
  function naturalCell(getter: CellGetter<number | string>, arg2?: Opt | string, arg3?: string): (row: any) => VNode {
    let opt: Opt = {}
    let cellStyle = BASE_CELL_STYLE

    if (typeof arg2 === 'string') {
      cellStyle = arg2
    }
    else if (typeof arg2 === 'object') {
      opt = arg2
      if (typeof arg3 === 'string') {
        cellStyle = arg3
      }
    }

    return (row: any) => {
      const { num, prefix, suffix } = parseNumberParts(getter(row))
      const formatted = toNumberString(num, {
        minFractionDigits: 0,
        maxFractionDigits: 0,
        ...opt,
      })
      return h('span', { style: cellStyle }, `${prefix}${formatted}${suffix}`)
    }
  }

  function decimalCell(getter: CellGetter<number | string>): (row: any) => VNode
  function decimalCell(getter: CellGetter<number | string>, opt: Opt): (row: any) => VNode
  function decimalCell(getter: CellGetter<number | string>, cellStyle: string): (row: any) => VNode
  function decimalCell(getter: CellGetter<number | string>, opt: Opt, cellStyle: string): (row: any) => VNode
  function decimalCell(getter: CellGetter<number | string>, arg2?: Opt | string, arg3?: string): (row: any) => VNode {
    let opt: Opt = {}
    let cellStyle = BASE_CELL_STYLE

    if (typeof arg2 === 'string') {
      cellStyle = arg2
    }
    else if (typeof arg2 === 'object') {
      opt = arg2
      if (typeof arg3 === 'string') {
        cellStyle = arg3
      }
    }

    return (row: any) => {
      const { num, prefix, suffix } = parseNumberParts(getter(row))
      const formatted = toNumberString(num, {
        minFractionDigits: 0,
        maxFractionDigits: 2,
        ...opt,
      })
      return h('span', { style: cellStyle }, `${prefix}${formatted}${suffix}`)
    }
  }

  const chipCell: CellRendererFunc<string | number> = (getter, cellStyle = CHIP_CELL_STYLE) =>
    row => h('span', { style: cellStyle }, getter(row))

  const inputCell: CellRendererFunc<string | number> = (getter, cellStyle = INPUT_CELL_STYLE) =>
    row => h('input', { type: 'text', value: getter(row), style: cellStyle })

  return { textCell, naturalCell, decimalCell, chipCell, inputCell }
}
