<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
// Pagination setup
const currentPage = ref(1)
const recordsPerPage = 5
const state = reactive({
  repositories: []
})
const fetchRepositories = async () => {
  try {
    const res = await fetch('https://api.github.com/users/IbifiriGraham-Jaja/repos', {
      method: 'GET',
      headers: {
        'X-Github-Api-Version': '2022-11-28',
        Accept: 'application/vnd.github+json'
      }
    })
    if (!res.ok) {
      throw new Error(`An error occurred while fetching the data: ${res.status}`)
    }
    const data = await res.json()
    state.repositories = data
    console.log(data)
  } catch (error) {
    console.error(error)
    throw error
  }
}
onMounted(() => {
  fetchRepositories()
})
const searchInput = ref('')
const filterRepository = computed(() => {
  const searchValue = searchInput.value.toLowerCase()
  return state.repositories.filter((repo) => repo.name.toLowerCase().includes(searchValue))
})
const indexOfLastRecord = computed(() => currentPage.value * recordsPerPage)
const firstIndex = computed(() => indexOfLastRecord.value - recordsPerPage)
const currentRecords = computed(() =>
  filterRepository.value.slice(firstIndex.value, indexOfLastRecord.value)
)
const noOfPages = computed(() => Math.ceil(filterRepository.value.length / recordsPerPage))
const numbers = computed(() => Array.from({ length: noOfPages.value }, (_, i) => i + 1))
const setCurrentPage = (page) => {
  currentPage.value = page
}
</script>

<template>
  <div>
    <Header />
    <!-- List of Repository & Search Input -->
    <div class="flex justify-between pb-8">
      <h1 class="text-2xl font-bold">List of Repositories</h1>
      <form action="#">
        <input
          v-model="searchInput"
          type="text"
          class="border-solid border-2 border-black rounded-md p-2"
          placeholder="Search for a repository...."
        />
      </form>
    </div>

    <!-- Repository Table -->
    <section class="pb-6" aria-label="repositories">
      <table class="w-full bg-white">
        <thead class="bg-black text-white text-left">
          <tr>
            <th class="py-4 px-4">Created at</th>
            <th class="py-4 px-4">Repository Name</th>
            <th class="py-4 px-4">Language</th>
            <th class="py-4 px-4"></th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="api in currentRecords" :key="api.id" class="bg-primary border-b border-black">
            <td class="py-4 px-4">{{ api.created_at }}</td>
            <td class="py-4 px-4">{{ api.name }}</td>
            <td class="py-4 px-4">{{ api.language }}</td>
            <td class="py-4 px-4">
              <RouterLink
                class="py-2 px-4 border-solid border-2 border-black rounded-md bg-transparent text-black hover:bg-black hover:text-white"
                :to="{ name: 'RepositoryDetails', params: { name: api.name } }"
                >Details</RouterLink
              >
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Pagination -->
    <section class="flex justify-center gap-2" aria-label="Pagination">
      <button
        class="py-2 px-4 border-solid border-2 border-black rounded-md bg-transparent text-black hover:bg-black hover:text-white"
        @click="setCurrentPage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <button
        v-for="page in numbers"
        :key="page"
        class="py-2 px-4 border-solid border-2 border-black rounded-md bg-transparent text-black hover:bg-black hover:text-white"
        @click="setCurrentPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="py-2 px-4 border-solid border-2 border-black rounded-md bg-transparent text-black hover:bg-black hover:text-white"
        @click="setCurrentPage(currentPage + 1)"
        :disabled="currentPage === noOfPages"
      >
        Next
      </button>
    </section>

    <!-- Error Boundary & Error Page -->
    <section class="flex gap-2 py-8">
      <RouterLink to="/NotFound">
        <button
          class="py-2 px-4 border-solid border-2 border-black rounded-md bg-transparent text-black hover:bg-black hover:text-white"
        >
          Error Page Test
        </button>
      </RouterLink>

      <RouterLink to="/ErrorBoundary">
        <button
          class="py-2 px-4 border-solid border-2 border-black rounded-md bg-transparent text-black hover:bg-black hover:text-white"
        >
          Error Boundary Test
        </button>
      </RouterLink>
    </section>

    <Footer />
  </div>
</template>

<style scoped></style>