<script setup>
import { reactive, onMounted } from 'vue'
const state = reactive({
  repositories: []
})
onMounted(() => {
  fetch('https://api.github.com/users/IbifiriGraham-Jaja', {
    method: 'GET',
    headers: {
      'X-Github-Api-Version': '2022-11-28',
      Accept: ' application/vnd.github+json'
    }
  }).then((res) =>
    res.json().then((data) => {
      state.repositories = data
      //   console.log(data)
    })
  )
})
</script>
<template>
  <section class="mt-80 mb-64">
    <div class="grid grid-cols-5 gap-4 w-fit">
      <div class="flex flex-col justify-center items-center row-span-2">
        <img
          class="rounded-full border-solid border-2 border-black w-4/5"
          :src="state.repositories?.avatar_url"
          alt="github_avatar"
        />
        <h2 class="text-1xl font-bold text-center pt-2">{{ state.repositories.name }}</h2>
        <p class="text-center">{{ state.repositories.bio }}</p>
      </div>
      <div class="bg-black text-white col-span-4 p-4 rounded-md">
        <h3 class="text-lg font-bold">About Me</h3>
        <p class="pt-4 text-justify">
            My name's Ibifiri Graham-Jaja. I am an enthusiastic and devoted student at AltSchool Africa,
             where my learning environment promotes innovation and creativity in technology.
              I am seeking to enhance my software development skills.
              I am passionate about coding and constantly looking for new ways to improve my abilities.
              Ultimately, I hope to build a portfolio of projects to showcase my skills and network with professionals in the industry.
              With my enthusiasm and the supportive environment at AltSchool Africa,
              I am confident in my ability to become a skilled software developer.
              I am excited about this journey and eager to learn and grow.
        </p>
      </div>
      <div class="bg-primary text-black col-span-2 p-4 h-85">
        <h3 class="text-lg font-bold">Repositories</h3>
        <p class="text-xl pt-2">{{ state.repositories.public_repos }}</p>
      </div>
      <div class="bg-primary text-black col-span-1 p-4 h-85">
        <h3 class="text-lg font-bold">Following</h3>
        <p class="text-xl pt-2">{{ state.repositories.following }}</p>
      </div>
      <div class="bg-primary text-black col-span-1 p-4 h-85">
        <h3 class="text-lg font-bold">Followers</h3>
        <p class="text-xl pt-2">{{ state.repositories.followers }}</p>
      </div>
    </div>
  </section>
</template>
<style scoped></style>