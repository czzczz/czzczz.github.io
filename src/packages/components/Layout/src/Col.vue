<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ShutBCol',
});
</script>

<style lang="scss" scoped>
.shut-b-col {
	box-sizing: border-box;
}

.shut-b-col--0 {
	display: none;
}
@for $i from 1 through 24 {
	.shut-b-col-#{$i} {
		max-width: (1 / 24 * $i * 100) * 1%;
		flex: 0 0 (1 / 24 * $i * 100) * 1%;
	}
	.shut-b-col-offset-#{$i} {
		margin-left: (1 / 24 * $i * 100) * 1%;
	}
	.shut-b-col-pull-#{$i} {
		position: relative;
		right: (1 / 24 * $i * 100) * 1%;
	}
	.shut-b-col-push-#{$i} {
		position: relative;
		left: (1 / 24 * $i * 100) * 1%;
	}
}
</style>
