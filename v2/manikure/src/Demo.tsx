import { JsonForms } from '@jsonforms/react'
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';
import schema from './schema.json';

const initialData = {
    name: 'Send email to Adrian',
    description: 'Confirm if you have passed the subject\nHereby ...',
    done: true,
    recurrence: 'Daily',
    rating: 3,
  };

function Demo() {
  return (
    <>
      <JsonForms 
        schema={schema}
        data={initialData}
        renderers={vanillaRenderers}
        cells={vanillaCells}
      />
    </>
  )
}

export default Demo
