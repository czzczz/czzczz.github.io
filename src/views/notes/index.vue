<template>
	<div class="notes page">
		<div class="knowledge-tree"></div>
		<div class="body">
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'MarkdownNotes',
};
</script>
