import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
  import('components/Banner'),
  {
    loading:() => <p>...</p>
  }
)

export default () =>
  <div>
    <DynamicComponent />
    <p>HOME PAGE is here!</p>
  </div>
