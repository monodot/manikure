<script setup>
import { ref, computed } from 'vue'
import { useProjectStore } from '../stores/project'

// const props = defineProps({
//     initialKeyValuePairs: Object
// })

const props = defineProps({
    initialKeyValuePairs: {
        type: Object,
        required: true
    }
})

function explode(object) {
    // TODO why is this code getting executed 4 times?
    console.log(`Exploding: ${JSON.stringify(object)}`)
    return Object.entries(object).map(([key, value]) => ({ key, value }))
}

// const keyValuePairs = ref(props.initialKeyValuePairs)

// const keyValuePairs = computed(() => {
//     console.log(`props.initialKeyValuePairs is: ${JSON.stringify(props.initialKeyValuePairs)}`)
//     return Object.entries(props.initialKeyValuePairs).map(([key, value]) => ({ key, value }))
// })
// const keyValuePairs = computed(() => props.initialKeyValuePairs)
// const keyValuePairs = computed(() => props.initialKeyValuePairs.newproperty = 'newvalue')
// const keyValuePairs = computed(() => explode(props.initialKeyValuePairs))

const keyValuePairs = computed(() => (props.initialKeyValuePairs ? explode(props.initialKeyValuePairs) : []))

// console.log(`initialKeyValuePairs is: ${JSON.stringify(props.initialKeyValuePairs)}`)

// const keyValuePairs = explode(ref(props.initialKeyValuePairs))


// const keyValuePairs = Object.entries(ref(props.initialKeyValuePairs).value).map(([key, value]) => ({ key, value }))

// const project = useProjectStore()

const emit = defineEmits(['update-source-foo'])

function updateSourceFoo(event) {
    console.log(`keyValuePairs is: ${JSON.stringify(keyValuePairs)}`)
    console.log(`emitting event: ${JSON.stringify(event)}`)
    emit('update-source-foo', event)
}

function updateKey(key) {
    console.log(`key is: ${key}, label is: ${label}`)
}

function rebuildTheWholeThing() {
    // Reduce the array of objects to a single object, and emit it
    const newArray = keyValuePairs.value.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
    }, {})
    emit('update-source-foo', newArray)
}

</script>

<template>
    <div v-for="(key, index) in keyValuePairs" :key="index">
        <div class="flex">
            <div>
                <p><input v-model="keyValuePairs[index].key"
                    class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline"
                    @change="rebuildTheWholeThing"/></p>
            </div>
            <div>
                <p><input v-model="keyValuePairs[index].value"
                    class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline"
                    @change="rebuildTheWholeThing"/></p>
            </div>
            <div><button>Delete</button></div>

        </div>
    </div>

</template>