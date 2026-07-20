import { getGreeting } from '../utils/greetings'

const Welcome = ({ user }) => {
  const greeting = getGreeting()
  const name = user?.displayName || ''

  return (
    <div className={'w-full px-5 py-8 flex flex-col items-center landscape:py-4'}>
      <h1 className={'text-3xl font-bold text-white'}>
        {greeting} {name}
      </h1>
    </div>
  )
}

export default Welcome
