import {tweened} from "svelte/motion"
import {writable} from "svelte/store"

export const barCount = writable(10)
export const barHeight = writable(60)

export const duration = writable(50)
export const xMax = tweened(null, {duration: 100})
export const svgWidth = writable(0)
export const height = writable(0)
export const scaleX = writable(() => {})
