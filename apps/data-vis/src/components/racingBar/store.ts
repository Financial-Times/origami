import {tweened} from "svelte/motion"
import {writable, derived} from "svelte/store"

export const barCount = writable(10)
export const barHeight = writable(70) // how many bars to show

export const duration = writable(300)
export const xMax = tweened(null, {duration: 100})
export const svgWidth = writable(0)
export const height = writable(0)
export const scaleX = writable(() => {})
