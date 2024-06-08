<script setup>
import { onMounted, ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useRoute } from 'vue-router'
// const state = reactive({
//   repositories: []
// })
const repository = ref(null)
const route = useRoute()
onMounted(() => {
  const repoName = route.params.name
  fetch(`https://api.github.com/repos/IbifiriGraham-Jaja/${repoName}`, {
    method: 'GET',
    headers: {
      'X-Github-Api-Version': '2022-11-28',
      Accept: 'application/vnd.github+json'
    }
  }).then((res) =>
    res.json().then((data) => {
      repository.value = data
      console.log(data)
    })
  )
})
</script>

<template>
  <div>
    <Header />
    <!--List of Repository & Search Input-->
    <div class="flex justify-between pb-8">
      <h1 class="text-2xl font-bold">Repository Details</h1>
    </div>

    <!--Repository Table-->
    <section class="pb-6" aria-label="repositories">
      <table class="w-full bg-white">
        <tbody class="text-gray-700 rounded-md">
          <tr class="bg-primary border-b border-black">
            <td class="py-4 font-bold px-4 w-1/4">Repository Name</td>
            <td class="py-4 px-4">{{ repository?.name }}</td>
          </tr>
          <tr class="bg-primary border-b border-black">
            <td class="py-4 font-bold px-4 w-1/4">Description</td>
            <td class="py-4 px-4">{{ repository?.description }}</td>
          </tr>

          <tr class="bg-primary border-b border-black">
            <td class="py-4 font-bold px-4 w-1/4">Created</td>
            <td class="py-4 px-4">{{ repository?.created_at }}</td>
          </tr>
          <tr class="bg-primary border-b border-black">
            <td class="py-4 font-bold px-4 w-1/4">Created</td>
            <td class="py-4 px-4">{{ repository?.updated_at }}</td>
          </tr>

          <tr class="bg-primary border-b border-black">
            <td class="py-4 font-bold px-4 w-1/4">Created</td>
            <td class="py-4 px-4">{{ repository?.pushed_at }}</td>
          </tr>

          <tr class="bg-primary border-b border-black">
            <td class="py-4 font-bold px-4 w-1/4">Stars</td>
            <td class="py-4 px-4">{{ repository?.stargazers_count }}</td>
          </tr>

          <tr class="bg-primary border-b border-black">
            <td class="py-4 font-bold px-4 w-1/4">Forks</td>
            <td class="py-4 px-4">{{ repository?.forks }}</td>
          </tr>

          <tr class="bg-primary border-b border-black">
            <td class="py-4 font-bold px-4 w-1/4">URL</td>
            <td class="py-4 px-4">{{ repository?.html_url }}</td>
          </tr>

          <tr class="bg-primary border-b border-black">
            <td class="py-4 font-bold px-4 w-1/4">Home Page URL</td>
            <td class="py-4 px-4">{{ repository?.homepage }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!--Error Boundary & Error Page -->
    <section class="flex gap-2 py-8">
      <RouterLink to="/">
        <button
          class="py-2 px-4 border-solid border-2 border-black rounded-md bg-transparent text-black hover:bg-black hover:text-white"
        >
          Back to Repository List
        </button>
      </RouterLink>
    </section>

    <Footer />
  </div>
</template>