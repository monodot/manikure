<script setup>
import KubernetesResourceItem from './KubernetesResourceItem.vue'
import KeyValueInput from './KeyValueInput.vue'

defineProps({
  nodeName: {
    type: String,
    required: true
  },
  schema: {
    type: Object,
    required: true
  },
  source: {
    // We don't require a type here, because it could be either
    // a simple value or an Object
    required: true
  }
})

function nodeIsArray(node) {
  return node.items !== undefined
}

function isCustomKeyValueList(node) {
  return node.type !== undefined && node.type.includes('object')
}

defineEmits(['update-source'])
</script>

<template>
  <div>
    <label>
      <strong v-text="nodeName"></strong>
      <!-- <p>Source: {{ JSON.stringify(source) }}</p>
      <p>schema: {{ JSON.stringify(schema)  }}</p>
      <p>NodeName: {{  JSON.stringify(nodeName) }}</p> -->
      <!-- <span v-text="node.description"></span> -->
    </label>
    <p v-if="schema.description !== undefined" v-text="schema.description"></p>

    <!-- If this element has properties, let's call ourself -->
    <!-- Recursion, recursion, recursion... -->
    <template v-if="schema.properties !== undefined">
      <div class="py-2 pl-6">
        <p class="font-bold">List of properties:</p>
        <KubernetesResourceItem
          v-for="(value, key) in schema.properties"
          :schema="value"
          :nodeName="key"
          :source="source && key in source ? source[key] : undefined"
          @update-source="source[key] = $event"
        />
      </div>
    </template>

    <!-- An array of items is used to define things like env vars, or containers in a Deployment -->
    <!-- <template v-else-if="schema.items !== undefined"> -->
    <template v-else-if="nodeIsArray(schema)">
      <!-- nodeIsArray -->
      <p class="font-bold">Array of items:</p>
      <KubernetesResourceItem
        v-for="(item, index) in source"
        :key="index"
        :schema="schema.items"
        :nodeName="BLEBLEBLE"
        :source="item"
      />
      <p><a href="#">Add another?</a></p>
    </template>

    <!-- This is a custom key-value list -->
    <template v-else-if="isCustomKeyValueList(schema)">
      <p class="font-bold">Custom key-value list:</p>
      <KeyValueInput 
        v-if="source"
        :initial-key-value-pairs="source" 
        @update-source-foo="source = $event; $emit('update-source', $event)"/>
      <!-- TODO: Tidy up these events. Also why are some events $event but some are $event.target.value ? -->
    </template>

    <!-- This is a string input -->
    <template v-else>
      <p class="font-bold">(Simple string input)</p>
      <input
        v-bind:value="source"
        class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline"
        @change="$emit('update-source', $event.target.value)"
      />
    </template>
    <!-- <input
      v-if="schema.properties == undefined && source !== undefined"
      v-bind:value="source"
      v-bind:placeholder="schema.type"
      class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline"
      @input="$emit('update-source', $event.target.value)"
    /> -->

    <!-- <KubernetesResourceItem
        v-else
        :nodeName="nodeName"
        :schema="schema"
        :source="source[key]"
        @update-source="source[key] = $event" /> -->

    <!-- <template v-for="(value, key) in schema.properties"> -->
    <!-- <p>Key: {{ key }}</p>
        <p>Value: {{ value }}</p> -->
    <!-- {{ source[key] }} -->
    <!-- <KubernetesResourceItem
        :nodeName="key"
        :schema="value"
        :source="source[key]"
        @update-source="source[key] = $event"
      /> -->
    <!-- <input
        v-else
        v-model="source[key]"
        v-bind:placeholder="value.type"
        class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline"
      /> -->
    <!-- </template> -->
    <!-- <template v-for="(value, key) in schema.properties">
        <KubernetesResourceItem
            v-if="value.properties !== undefined && source !== undefined"
            :nodeName="brenda"
            :schema="value"
            :source="source[key]"
            @update-source="source[key] = $event" />
        <input
            v-else
        v-bind:value="source"
        v-bind:placeholder="schema.type"
        class="appearance-none bg-gray-200 w-full py-2 px-4 block rounded text-gray-800 focus:outline-none focus:shadow-outline"
        @input="$emit('update-source', $event.target.value)"
        />
    </template> -->
    <!-- <KubernetesResourceItem 
        v-for="(value, key) in schema.properties" 
        :nodeName="key" 
        :schema="value" 
        :source="source[key]" 
        @update-source="source[key] = $event" /> -->
  </div>
</template>
