import Logo from "~components/logo"
import { ModeToggle } from "~components/mode-toggle"

const HeaderSection = () => {
  return (
    <div className="flex justify-between items-center bg-emerald-800 text-xl text-white font-medium py-4 px-6">
      <a href="https://getgreencheck.com/" target="_blank">
        <Logo />
      </a>
      <div className="flex gap-1">
        <ModeToggle />
      </div>
    </div>
  )
}

export default HeaderSection
