// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Iframe> = (args) => {
//   return <Iframe {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta } from '@storybook/react'

import Iframe from './Iframe'

export const generated = () => {
  return (
    <Iframe
      src="https://www.youtube.com/embed/HBYE1Aysc6I?si=lp8lGPTVmvTSCoWI"
      aspect="16/9"
    />
  )
}

export default {
  title: 'Components/Iframe',
  component: Iframe,
} as Meta<typeof Iframe>
