<template>
  <h1>Details of post</h1>
  <div v-if="error">{{ error }}</div>
  <div v-if="posts" class="post">
    <h3>{{ posts.title }}</h3>
  </div>
</template>

<script>

import getPost from "@/composable/getPost";

export default {
    props: ['id'],
    setup(props){
        const {posts, error, load} = getPost(props.id);

        load();

        return {posts, error}
    }
}
</script>

<style>
    .post{
        max-width: 1200px;
        margin: 0 auto;
    }
    .post p{
        color: #444;
        line-height: 1.5em;
        margin-top:40px;
        font-style: italic  ;
    }
    .pre{
        white-space: pre-line;
    }
</style>