<script setup >
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
</script>

<template>
  <quillEditor v-model="content" :options="editorOption" />
</template>

<style lang='scss' scoped>

</style>