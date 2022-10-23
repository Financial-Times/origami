import { writable, derived } from 'svelte/store';
import { tweened } from "svelte/motion";

export const data = writable([]);
export const duration = 300; // ms between keyframes
export const barCount = 8; // how many bars to show
export const barMargin = 4; // space between bars
export const keyframeCount = data.length; // number of keyframes


const dimensions = writable({});
const scales = writable({});
const barData = derived(duration, $duration => tweened(null, { duration: $duration }) );
const xMax = tweened(null, { duration });
