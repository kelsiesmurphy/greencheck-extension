import LogoOptions from "~components/logo-options"

const HeaderOptions = () => {
  return (
    <nav className="bg-white items-center shadow-sm justify-between p-4 transition-all">
      <div className="container py-0 transition-all duration-300">
        <a href="https://getgreencheck.com/" target="_blank">
          <LogoOptions />
        </a>
      </div>
    </nav>
  )
}

export default HeaderOptions
