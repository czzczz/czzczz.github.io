<script lang="tsx">
import { defineComponent, h, computed, provide, PropType } from 'vue';

export type RowType = 'flex' | 'float';

export type RowJustify = 'center' | 'start' | 'end' | 'space-around' | 'space-between';

export type RowAlign = 'center' | 'top' | 'bottom';

export default defineComponent({
	name: 'ShutBRow',

	props: {
		tag: {
			type: String,
			default: 'div',
		},
		type: {
			type: String as PropType<RowType>,
			default: 'flex',
		},
		flexWrap: {
			type: Boolean,
			default: true,
		},
		justify: {
			type: String as PropType<RowJustify>,
			default: 'start',
		},
		align: {
			type: String as PropType<RowJustify>,
			default: 'top',
		},
		gutter: {
			type: Number,
			default: 0,
		},
	},

	setup(props, { slots }) {
		provide('RowGutter', props.gutter);

		const style = computed(() => {
			const ret: Partial<CSSStyleDeclaration> = {};
			if (props.gutter) ret.marginRight = ret.marginLeft = `-${props.gutter / 2}px`;
			return ret;
		});

		return () =>
			h(
				props.tag,
				{
					class: [
						'shut-b-row',
						props.type,
						props.type === 'flex' && props.flexWrap && 'flex-wrap',
						`justify-${props.justify}`,
						`align-${props.align}`,
					],
					style: style.value,
				},
				slots.default?.(),
			);
	},
});
</script>

<style lang="scss" scoped>
.shut-b-row {
	&.flex {
		display: flex;
		&-wrap {
			flex-wrap: wrap;
		}
	}
	&.justify {
		&-center {
			justify-content: center;
		}
		&-start {
			justify-content: flex-start;
		}
		&-end {
			justify-content: flex-end;
		}
		&-space-around {
			justify-content: space-around;
		}
		&-space-between {
			justify-content: space-between;
		}
	}
	&.align {
		&-center {
			align-items: center;
		}
		&-top {
			align-items: flex-start;
		}
		&-bottom {
			align-items: flex-end;
		}
	}
}
</style>
