<script lang="tsx">
import { defineComponent, h, inject, computed, PropType } from 'vue';

interface SizeObject {
	span: number;
	offset: number;
}

export default defineComponent({
	name: 'ShutBCol',

	props: {
		span: {
			type: Number,
			default: 24,
		},
		offset: {
			type: Number,
			default: 0,
		},
		pull: {
			type: Number,
			default: 0,
		},
		push: {
			type: Number,
			default: 0,
		},
		xs: {
			type: [Number, Object] as PropType<number | SizeObject>,
			default: () => ({} as SizeObject),
		},
		sm: {
			type: [Number, Object] as PropType<number | SizeObject>,
			default: () => ({} as SizeObject),
		},
		md: {
			type: [Number, Object] as PropType<number | SizeObject>,
			default: () => ({} as SizeObject),
		},
		lg: {
			type: [Number, Object] as PropType<number | SizeObject>,
			default: () => ({} as SizeObject),
		},
		xl: {
			type: [Number, Object] as PropType<number | SizeObject>,
			default: () => ({} as SizeObject),
		},
	},

	setup(props, { slots }) {
		const gutter = inject('RowGutter', 0);

		const style = computed(() => {
			if (gutter)
				return {
					display: 'block',
					minHeight: '1px',
					paddingLeft: gutter / 2 + 'px',
					paddingRight: gutter / 2 + 'px',
				};
			return {};
		});

		const classList = computed(() => {
			const ret: string[] = [];
			const pos = ['span', 'offset', 'pull', 'push'] as const;
			pos.forEach(prop => {
				const size = props[prop];
				if (typeof size === 'number' && size >= 0)
					ret.push(prop !== 'span' ? `shut-b-col-${prop}-${props[prop]}` : `shut-b-col-${props[prop]}`);
			});
			const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

			sizes.forEach(size => {
				const sizeProps = props[size];
				if (typeof sizeProps === 'number') ret.push(`shut-b-col-${size}-${sizeProps}`);
				else if (typeof sizeProps === 'object')
					Object.keys(sizeProps).forEach(prop => {
						const key = prop as keyof SizeObject;
						ret.push(
							prop !== 'span'
								? `shut-b-col-${size}-${prop}-${sizeProps[key]}`
								: `shut-b-col-${size}-${sizeProps[key]}`,
						);
					});
			});
			return ret;
		});

		return () =>
			h(
				'div',
				{
					class: ['shut-b-col', classList.value],
					style: style.value,
				},
				slots.default?.(),
			);
	},
});
</script>

<style lang="scss" scoped>
@import './media.scss';
.shut-b-col {
	box-sizing: border-box;
}

.shut-b-col-0 {
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

$colMediaList: xs, sm, md, lg, xl;

@each $size in $colMediaList {
	@include screen($size) {
		.el-col-#{$size}-0 {
			display: none;
		}
		@for $i from 0 through 24 {
			.el-col-#{$size}-#{$i} {
				max-width: (1 / 24 * $i * 100) * 1%;
				flex: 0 0 (1 / 24 * $i * 100) * 1%;
			}

			.el-col-#{$size}-offset-#{$i} {
				margin-left: (1 / 24 * $i * 100) * 1%;
			}

			.el-col-#{$size}-pull-#{$i} {
				position: relative;
				right: (1 / 24 * $i * 100) * 1%;
			}

			.el-col-#{$size}-push-#{$i} {
				position: relative;
				left: (1 / 24 * $i * 100) * 1%;
			}
		}
	}
}
</style>
