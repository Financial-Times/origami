<script lang="ts">
	export let width = 0
	export let y = 0
	export let x = 0
	export let fill = ''
</script>

<rect {x} {y} {width} {fill} />

<style lang="scss">

rect {
	height: 70px;
	transition: width 1s linear;
}
</style>
