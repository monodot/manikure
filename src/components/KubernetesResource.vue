<template>
  <div class="myform">
    <json-forms
      :data="resource"
      :renderers="renderers"
      :schema="schema"
      :uischema="uischema"
      @change="onChange"
    />
  </div>
</template>

<!-- <script lang="ts"> -->
<script setup lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { ref } from 'vue'
import { useProjectStore } from '../stores/project'
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue'
import { defaultStyles, mergeStyles, vanillaRenderers } from '@jsonforms/vue-vanilla'

const project = useProjectStore()
let resource = project.documents[project.selectedDocument]

// const emit = defineEmits(['something-changed'])

function onChange(event: JsonFormsChangeEvent) {
    project.documents[project.selectedDocument] = event.data; // update the Pinia state directly
}

// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, { control: { label: 'mylabel' } })

const renderers = Object.freeze([ // freeze renderers for performance gains
  ...vanillaRenderers
  // here you can add custom renderers
]);

const schema = {
  properties: {
    apiVersion: {
      type: 'string',
      description: 'The version of the Kubernetes API',
      enum: ['apps/v1', 'papps/v2']
    },
    kind: {
      type: 'string',
      description: 'The type of the Kubernetes resource'
    },
    // "metadata": {
    //   "properties": {
    //     "labels": {
    //       "additionalProperties": {
    //         "type": [
    //           "string",
    //           "null"
    //         ]
    //       },
    //       "description": "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels",
    //       "type": [
    //         "object",
    //         "null"
    //       ]
    //     },
    //     "name": {
    //       "description": "Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names",
    //       "type": [
    //         "string",
    //         "null"
    //       ]
    //     },
    //     "namespace": {
    //       "description": "Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the \"default\" namespace, but \"default\" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.\n\nMust be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces",
    //       "type": [
    //         "string",
    //         "null"
    //       ]
    //     },
    //   },
    //   "type": [
    //     "object",
    //     "null"
    //   ]
    // },
    name: {
      type: 'string',
      minLength: 1,
      description: "The task's name"
    },
    description: {
      title: 'Long Description',
      type: 'string'
    },
    done: {
      type: 'boolean'
    },
    dueDate: {
      type: 'string',
      format: 'date',
      description: "The task's due date"
    },
    rating: {
      type: 'integer',
      maximum: 5
    },
    recurrence: {
      type: 'string',
      enum: ['Never', 'Daily', 'Weekly', 'Monthly']
    },
    recurrenceInterval: {
      type: 'integer',
      description: 'Days until recurrence'
    }
  }
}

const uischema = {
  type: 'HorizontalLayout',
  elements: [
    {
      type: 'VerticalLayout',
      elements: [
        {
            type: 'Control',
            scope: '#/properties/apiVersion'
        },
        {
            type: 'Control',
            scope: '#/properties/kind'
        },
        {
          type: 'Control',
          scope: '#/properties/metadata'
        },
        {
          type: 'Control',
          scope: '#/properties/description',
          options: {
            multi: true
          }
        },
        {
          type: 'Control',
          scope: '#/properties/done'
        }
      ]
    }
  ]
}



// export default defineComponent({
//   name: 'App',
//   components: {
//     JsonForms
//   },
//   data() {
//     return {
//       // freeze renderers for performance gains
//       renderers: Object.freeze(renderers),
//       data: {
//         name: 'Send email to Adrian',
//         description: 'Confirm if you have passed the subject\nHereby ...',
//         done: true,
//         recurrence: 'Daily',
//         rating: 3
//       },
//       schema,
//       uischema
//     }
//   },
//   methods: {
//     onChange(event: JsonFormsChangeEvent) {
//       this.data = event.data
//     }
//   },
//   provide() {
//     return {
//       styles: myStyles
//     }
//   }
// })
</script>

<style>
.mylabel {
  color: darkslategrey;
}

.vertical-layout {
  margin-left: 10px;
  margin-right: 10px;
}

.myform {
  width: 640px;
  margin: 0 auto;
}

.text-area {
  min-height: 80px;
}
</style>
