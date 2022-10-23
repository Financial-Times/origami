<script lang="ts">
	export let width = 0
	export let y = 0
	export let x = 0
	export let fill = ''

	// scale width using d3
</script>

<rect {x} {y} {width} {fill} fill-opacity={0.75} />
<rect {x} {y} width={4} {fill} />

<style lang="scss">

rect {
	height: 70px;
	transition: width 30ms linear;
}
</style>
