import { getGreeting } from '../utils/greetings'

const Welcome = ({ user }) => {
  const greeting = getGreeting()
  const name = user?.displayName?.trim().split(/\s+/)[0] || ''

  return (
    <div className="flex w-full flex-col items-center px-5 py-8">
      <h1 className="w-full text-center text-[clamp(1.5rem,5vw,2rem)] font-bold whitespace-nowrap text-white">
        {greeting} {name}
      </h1>
    </div>
  )
}

export default Welcome
