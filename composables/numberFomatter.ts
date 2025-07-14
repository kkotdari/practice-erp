import type { VNodeChild } from 'vue'

export interface Opt {
  locale?: string
  prefix?: string
  suffix?: string
  useGrouping?: boolean
  minFractionDigits?: number
  maxFractionDigits?: number
}

const baseOpt: Required<Opt> = {
  locale: 'ko-KR',
  prefix: '',
  suffix: '',
  useGrouping: true,
  minFractionDigits: 0,
  maxFractionDigits: 2,
}

function parseNumber(input: number | string): number {
  const n = typeof input === 'string' ? Number.parseFloat(input.replace(/[^\d.-]/g, '')) : input
  return Number.isNaN(n) ? 0 : n
}

function formatString(n: number, opt: Opt = {}): string {
  const o = { ...baseOpt, ...opt }
  const num = parseNumber(n)
  const pos = num >= 0
  const nf = new Intl.NumberFormat(o.locale, {
    useGrouping: o.useGrouping,
    minimumFractionDigits: o.minFractionDigits,
    maximumFractionDigits: o.maxFractionDigits,
  })
  const text = `${o.prefix}${pos ? '' : '-'}${nf.format(Math.abs(num))}${o.suffix}`
  return `${text}`
}

function formatVNodeParts(n: number, opt: Opt = {}): VNodeChild[] {
  const o = { ...baseOpt, ...opt }
  const num = parseNumber(n)
  const nf = new Intl.NumberFormat(o.locale, {
    useGrouping: o.useGrouping,
    minimumFractionDigits: o.minFractionDigits,
    maximumFractionDigits: o.maxFractionDigits,
  })
  const text = `${nf.format(Math.abs(num))}${o.suffix}`
  const parts: VNodeChild[] = []
  parts.push(text)

  return parts
}

export function useNumberFormatter(): {
  toNumberString: (input: number | string, opt?: Opt) => string
  toNumberVNodeParts: (input: number | string, opt?: Opt) => VNodeChild[]
} {
  const toNumberString = (input: number | string, opt: Opt = {}) =>
    formatString(parseNumber(input), opt)

  const toNumberVNodeParts = (input: number | string, opt: Opt = {}) =>
    formatVNodeParts(parseNumber(input), opt)

  return {
    toNumberString,
    toNumberVNodeParts,
  }
}
